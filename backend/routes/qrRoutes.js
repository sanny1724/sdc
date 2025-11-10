import express from 'express';
import { generateQR } from '../controllers/qrController.js';

const router = express.Router();

// GET /api/qr/:id - Generate QR code for user
router.get('/:id', generateQR);

export default router;

