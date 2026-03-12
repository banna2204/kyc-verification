import express from 'express';
import multer from 'multer';
import path from 'path';
import KYC from '../models/KYC.js'
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
console.log('SendGrid API Key starting with:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) + '...' : 'MISSING');
const apiKey = process.env.SENDGRID_API_KEY?.trim();
sgMail.setApiKey(apiKey);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Send Email OTP
router.post('/send-email-otp', async (req, res) => {
  try {
    const { email, fullName } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ message: 'Email and Full Name are required' });
    }

    let kycRecord = await KYC.findOne({ email });

    // Cooldown check (30 seconds)
    if (kycRecord && kycRecord.lastOtpSentAt) {
      const secondsSinceLastOtp = (Date.now() - new Date(kycRecord.lastOtpSentAt).getTime()) / 1000;
      if (secondsSinceLastOtp < 30) {
        return res.status(429).json({ 
          message: `Please wait ${Math.ceil(30 - secondsSinceLastOtp)} seconds before requesting another OTP.` 
        });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const msg = {
      to: email,
      from: process.env.TO_EMAIL, 
      subject: 'Your KYC Verification OTP',
      text: `Your OTP for KYC verification is ${otp}. It will expire in 5 minutes.`,
      html: `<strong>Your OTP for KYC verification is ${otp}. It will expire in 5 minutes.</strong>`,
    };

    let emailSent = false;
    try {
        await sgMail.send(msg);
        emailSent = true;
    } catch (err) {
        console.error('SendGrid Error:', err.response?.body || err.message);
        console.log('--- FALLBACK ---');
        console.log(`To: ${email}`);
        console.log(`OTP: ${otp}`);
        console.log('----------------');
    }

    if (!kycRecord) {
      kycRecord = new KYC({
        email,
        fullName,
        otp,
        otpExpiresAt,
        lastOtpSentAt: new Date(),
        status: 'Pending'
      });
    } else {
      kycRecord.fullName = fullName;
      kycRecord.otp = otp;
      kycRecord.otpExpiresAt = otpExpiresAt;
      kycRecord.lastOtpSentAt = new Date();
    }

    await kycRecord.save();
    
    if (emailSent) {
        res.status(200).json({ message: 'OTP sent successfully' });
    } else {
        res.status(200).json({ 
            message: 'OTP generated (Email failed, check server console)', 
            debug: 'Check server console for OTP' 
        });
    }
  } catch (error) {
    console.error('SendGrid Error:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// Verify Email OTP
router.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const kycRecord = await KYC.findOne({ email });

    if (!kycRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    if (kycRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(kycRecord.otpExpiresAt)) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    kycRecord.emailVerified = true;
    kycRecord.otp = undefined;
    kycRecord.otpExpiresAt = undefined;
    kycRecord.status = "In Progress";
    
    // Add timeline event if not already present for this stage
    const hasVerifiedEvent = kycRecord.timelineEvents.some(e => e.status === "Email Verified");
    if (!hasVerifiedEvent) {
      kycRecord.timelineEvents.push({
        status: "Email Verified",
        message: "Email address verified successfully."
      });
    }

    await kycRecord.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      user: kycRecord
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

// Update legacy personal-details route to use email
router.post('/personal-details', async (req, res) => {
  try {
    const { email, ...personalDetails } = req.body;

    const kycRecord = await KYC.findOne({ email });
    if (!kycRecord) return res.status(404).json({ message: 'User not found' });

    kycRecord.personalDetails = { ...kycRecord.personalDetails, ...personalDetails };
    kycRecord.timelineEvents.push({ status: 'Details Submitted', message: 'Personal details have been saved.' });
    await kycRecord.save();

    res.status(200).json({ message: 'Personal details saved', user: kycRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update legacy documents route to use email
router.post('/documents', upload.fields([
  { name: 'aadhaar', maxCount: 1 },
  { name: 'pan', maxCount: 1 },
  { name: 'selfie', maxCount: 1 }
]), async (req, res) => {
  try {
    const { email } = req.body;
    const files = req.files;

    const kycRecord = await KYC.findOne({ email });
    if (!kycRecord) return res.status(404).json({ message: 'User not found' });

    if (!kycRecord.documents) {
      kycRecord.documents = {};
    }

    if (files.aadhaar) kycRecord.documents.aadhaarUrl = files.aadhaar[0].path;
    if (files.pan) kycRecord.documents.panUrl = files.pan[0].path;
    if (files.selfie) kycRecord.documents.selfieUrl = files.selfie[0].path;

    kycRecord.status = 'Pending Verification';
    kycRecord.timelineEvents.push({ status: 'Documents Uploaded', message: 'Documents submitted for verification.' });

    await kycRecord.save();

    res.status(200).json({ message: 'Documents uploaded successfully', user: kycRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update legacy status route to use email
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const kycRecord = await KYC.findOne({ email });

    if (!kycRecord) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user: kycRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update legacy finalize route to use email
router.post('/finalize', async (req, res) => {
  try {
    const { email, status, message } = req.body;

    const kycRecord = await KYC.findOne({ email });
    if (!kycRecord) return res.status(404).json({ message: 'User not found' });

    kycRecord.status = status;
    kycRecord.timelineEvents.push({ status: `KYC ${status}`, message: message || `Your KYC has been ${status.toLowerCase()}.` });

    await kycRecord.save();

    res.status(200).json({ message: `KYC ${status}`, user: kycRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
