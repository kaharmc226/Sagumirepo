import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';
import { supabase } from '../config/supabase.js';
import { ALLOWED_MIME_TO_EXT, detectImageMime } from '../middleware/upload.js';
import { AppError } from '../utils/AppError.js';

/**
 * Upload validated payment proof image into private Supabase Storage bucket.
 */
export async function uploadPaymentProof(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError(400, 'VALIDATION_ERROR', 'File bukti pembayaran wajib diunggah', [
        { field: 'file', message: 'File wajib diunggah' },
      ]);
    }

    const detectedMime = detectImageMime(req.file.buffer);
    if (!detectedMime) {
      throw new AppError(400, 'INVALID_FILE_TYPE', 'Format file harus JPG, PNG, atau WebP');
    }

    const ext = ALLOWED_MIME_TO_EXT[detectedMime];
    const filePath = `proofs/${randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from(env.supabaseStorageBucket)
      .upload(filePath, req.file.buffer, {
        contentType: detectedMime,
        upsert: false,
      });

    if (error) {
      console.error('[Supabase] uploadPaymentProof:', error);
      throw new AppError(500, 'INTERNAL_ERROR', 'Gagal mengunggah bukti pembayaran');
    }

    return res.status(201).json({
      success: true,
      data: {
        file_path: filePath,
      },
    });
  } catch (err) {
    return next(err);
  }
}

