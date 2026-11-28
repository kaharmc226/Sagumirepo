import { Router } from 'express';
import { uploadPaymentProof } from '../controllers/uploads.controller.js';
import { uploadPaymentProofFile } from '../middleware/upload.js';

const router = Router();

router.post('/payment-proof', uploadPaymentProofFile, uploadPaymentProof);

export default router;

