import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  otp: String,
  otpExpiresAt: Date,
  lastOtpSentAt: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Pending Verification', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  personalDetails: {
    dob: Date,
    gender: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  documents: {
    aadhaarUrl: String,
    panUrl: String,
    selfieUrl: String,
  },
  timelineEvents: [
    {
      status: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
},{ timestamps: true });

export default mongoose.model('KYC', kycSchema);
