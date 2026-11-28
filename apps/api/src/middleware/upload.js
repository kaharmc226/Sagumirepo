import multer from 'multer';
import { AppError } from '../utils/AppError.js';

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/**
 * Inspect file magic bytes to confirm JPEG, PNG, or WebP regardless of client MIME header.
 */
export function detectImageMime(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    return null;
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  if (
    buffer.length >= PNG_SIGNATURE.length &&
    PNG_SIGNATURE.every((byte, idx) => buffer[idx] === byte)
  ) {
    return 'image/png';
  }

  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }

  return null;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1,
  },
  fileFilter(_req, file, cb) {
    if (!Object.hasOwn(ALLOWED_MIME_TO_EXT, file.mimetype)) {
      return cb(
        new AppError(400, 'INVALID_FILE_TYPE', 'Format file harus JPG, PNG, atau WebP'),
      );
    }
    return cb(null, true);
  },
});

const singlePaymentProof = upload.single('file');

/**
 * Multer middleware wrapper translating upload errors into standard AppError codes.
 */
export function uploadPaymentProofFile(req, res, next) {
  singlePaymentProof(req, res, (err) => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError(413, 'FILE_TOO_LARGE', 'Ukuran file maksimal 5 MB'));
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_FILE_COUNT') {
        return next(
          new AppError(
            400,
            'VALIDATION_ERROR',
            "Gunakan satu field 'file' untuk mengunggah bukti pembayaran",
          ),
        );
      }
      return next(new AppError(400, 'VALIDATION_ERROR', err.message));
    }

    return next(err);
  });
}

