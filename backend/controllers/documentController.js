import Document from '../models/Document.js';
import { extractTextFromBuffer } from '../utils/ocrParser.js';
import fs from 'fs';
import path from 'path';

export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user._id;
    const { documentType } = req.body;
    const file = req.file;

    if (!documentType || !['aadhaar', 'pan', 'photo'].includes(documentType)) {
      return res.status(400).json({ success: false, message: 'Invalid document type' });
    }

    if (!file) {
      return res.status(400).json({ success: false, message: 'File is required' });
    }

    // Check duplicate
    if (documentType !== 'photo') {
      const existing = await Document.findOne({
        userId,
        documentType,
        verificationStatus: { $in: ['pending', 'verified'] }
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `You already have a ${existing.verificationStatus} upload for ${documentType}`
        });
      }
    }

    let extractedData = '';

    if (documentType === 'aadhaar' || documentType === 'pan') {
      extractedData = await extractTextFromBuffer(file.buffer, file.mimetype);

      let isValid = false;
      // Prevent massive books/PDFs from bypassing validation by matching random numbers
      if (extractedData.length < 10000) {
        if (documentType === 'aadhaar') {
          const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
          if (aadhaarRegex.test(extractedData)) isValid = true;
        } else if (documentType === 'pan') {
          const panRegex = /\b[A-Za-z]{5}\s?[0-9]{4}\s?[A-Za-z]\b/;
          if (panRegex.test(extractedData)) isValid = true;
        }
      }

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Uploaded document is not valid Aadhaar/PAN'
        });
      }
    }

    const ext = file.originalname ? file.originalname.split('.').pop() : 'jpg';
    const filename = `${userId}-${documentType}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);
    
    const fileUrl = `http://localhost:3000/uploads/${filename}`;

    const newDocument = new Document({
      userId,
      documentType,
      fileUrl,
      verificationStatus: 'pending',
      extractedData
    });

    await newDocument.save();

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      data: newDocument
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getPendingDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ verificationStatus: 'pending' }).populate('userId', 'email name');
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    document.verificationStatus = status;
    await document.save();

    res.status(200).json({ success: true, message: `Document status updated to ${status}`, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const documents = await Document.find({ userId });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
