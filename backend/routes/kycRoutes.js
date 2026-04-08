import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import {
  submitBasicDetails,
  uploadDocuments,
  getKycStatus,
  finalSubmit
} from '../controllers/kycController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply JWT verification middleware to all KYC routes
router.use(protect);

router.post('/basic-details', submitBasicDetails);
router.post('/documents', upload.fields([
  { name: 'idFront', maxCount: 1 },
  { name: 'pan', maxCount: 1 },
  { name: 'selfie', maxCount: 1 }
]), uploadDocuments);
router.get('/status', getKycStatus);
router.post('/submit', finalSubmit);

export default router;
