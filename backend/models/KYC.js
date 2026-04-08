import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  basicDetails: {
    name: String,
    lastName: String,
    phone: String,
    dob: String,
    zip: String,
    city: String,
    currency: String,
    country: String,
  },
  documentType: {
    type: String,
    enum: ['digilocker', 'manual'],
  },
  documentData: {
    digilockerId: String,
    digilockerStatus: String,
  },
  files: {
    idFrontUrl: String,
    panUrl: String,
    selfieUrl: String,
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Submitted', 'In Progress', 'Verified', 'Rejected'],
    default: 'Pending',
  },
  timelineEvents: [
    {
      status: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

export default mongoose.model('KYC', kycSchema);
