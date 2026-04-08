import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log('SendGrid API Key starting with:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) + '...' : 'MISSING');
const apiKey = process.env.SENDGRID_API_KEY?.trim();
sgMail.setApiKey(apiKey);

export const sendOtpEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.TO_EMAIL, 
    subject: 'Your KYC Verification OTP',
    text: `Your OTP for KYC verification is ${otp}. It will expire in 5 minutes.`,
    html: `<strong>Your OTP for KYC verification is ${otp}. It will expire in 5 minutes.</strong>`,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (err) {
    console.error('SendGrid Error:', err.response?.body || err.message);
    console.log('--- FALLBACK ---');
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log('----------------');
    return false;
  }
};
