import KYC from '../models/KYC.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const submitBasicDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const bodyArgs = req.body;
    
    // We expect the body to have basic details matching Step 1
    let kycRecord = await KYC.findOne({ userId });
    
    if (!kycRecord) {
      kycRecord = new KYC({ userId });
    }

    kycRecord.basicDetails = { ...kycRecord.basicDetails, ...bodyArgs };
    kycRecord.timelineEvents.push({ status: 'Details Submitted', message: 'Basic personal details have been saved.' });
    await kycRecord.save();

    res.status(200).json({ success: true, message: 'Personal details saved', data: kycRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const uploadDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { documentType, digilockerId } = req.body; // 'digilocker' or 'manual'

    let kycRecord = await KYC.findOne({ userId });
    if (!kycRecord) return res.status(404).json({ success: false, message: 'KYC record not found. Please complete Step 1 first.' });

    kycRecord.documentType = documentType;

    if (documentType === 'digilocker') {
      if (!digilockerId) {
         return res.status(400).json({ success: false, message: 'DigiLocker ID is required' });
      }
      kycRecord.documentData = {
        digilockerId,
        digilockerStatus: 'Verified (Simulated)'
      };
      kycRecord.timelineEvents.push({ status: 'DigiLocker Verified', message: 'Identity verified through DigiLocker successfully.' });
    } else {
      // Manual upload processing using multer
      const files = req.files || {};
      if (!kycRecord.files) kycRecord.files = {};

      if (files.idFront) {
        const url = await uploadToCloudinary(files.idFront[0].buffer, "kyc_documents");
        if (url) kycRecord.files.idFrontUrl = url;
      }
      if (files.pan) {
        const url = await uploadToCloudinary(files.pan[0].buffer, "kyc_documents");
        if (url) kycRecord.files.panUrl = url;
      }
      if (files.selfie) {
        const url = await uploadToCloudinary(files.selfie[0].buffer, "kyc_documents");
        if (url) kycRecord.files.selfieUrl = url;
      }
      kycRecord.timelineEvents.push({ status: 'Documents Uploaded', message: 'Documents submitted for manual verification.' });
    }

    kycRecord.verificationStatus = 'In Progress';
    await kycRecord.save();

    res.status(200).json({ success: true, message: 'Documents uploaded successfully', data: kycRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const finalSubmit = async (req, res) => {
  try {
    const userId = req.user._id;

    let kycRecord = await KYC.findOne({ userId });
    if (!kycRecord) return res.status(404).json({ success: false, message: 'KYC record not found' });

    kycRecord.verificationStatus = 'Submitted';
    kycRecord.timelineEvents.push({ status: 'KYC Submitted', message: 'Your KYC application has been submitted and is under review.' });

    await kycRecord.save();

    res.status(200).json({ success: true, message: 'KYC application submitted successfully', data: kycRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getKycStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const kycRecord = await KYC.findOne({ userId });

    if (!kycRecord) return res.status(404).json({ success: true, message: 'No KYC record found' });

    res.status(200).json({ success: true, data: kycRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
