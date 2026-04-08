import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { documentUpload } from '../middleware/uploadMiddleware.js';
import {
  uploadDocument,
  getPendingDocuments,
  updateDocumentStatus,
  getUserDocuments
} from '../controllers/documentController.js';

const router = express.Router();

router.use(protect);

router.post('/upload', (req, res, next) => {
  documentUpload.single('file')(req, res, (err) => {
    if (err) {
      if (err.message.includes('Only PDF') || err.message.includes('Only JPG')) {
        return res.status(400).json({ success: false, message: 'Only valid document formats allowed' });
      }
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds limit' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, uploadDocument);

router.get('/my-documents', getUserDocuments);

router.get('/admin/pending', adminProtect, getPendingDocuments);
router.patch('/admin/verify/:id', adminProtect, updateDocumentStatus);

export default router;
