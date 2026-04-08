import express from 'express';
import { registerOrLogin, verifyOtp, adminLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerOrLogin);
router.post('/login', registerOrLogin);
router.post('/admin-login', adminLogin);
router.post('/verify-otp', verifyOtp);

export default router;
