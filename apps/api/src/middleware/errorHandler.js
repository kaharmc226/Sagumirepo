import { AppError } from '../utils/AppError.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
    },
  });
}

export function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    const errorBody = {
      code: err.code,
      message: err.message,
    };
    if (err.details) {
      errorBody.details = err.details;
    }
    return res.status(err.statusCode).json({
      success: false,
      error: errorBody,
    });
  }

  console.error('[Unhandled Error]', err);
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Terjadi kesalahan pada server',
    },
  });
}
