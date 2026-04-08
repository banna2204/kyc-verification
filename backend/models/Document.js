import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  documentType: {
    type: String,
    enum: ['aadhaar', 'pan', 'photo'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  extractedData: {
    type: String,
    default: '',
  }
}, { timestamps: true });

// Prevent duplicate verified or pending documents of the same type for a user
documentSchema.index({ userId: 1, documentType: 1 }, { 
  unique: true, 
  partialFilterExpression: { 
    verificationStatus: { $in: ['pending', 'verified'] },
    documentType: { $in: ['aadhaar', 'pan'] }
  } 
});

export default mongoose.model('Document', documentSchema);
