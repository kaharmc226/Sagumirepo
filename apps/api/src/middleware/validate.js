import { AppError } from '../utils/AppError.js';

/**
 * Validasi req[property] ('body' | 'query' | 'params') menggunakan schema Joi.
 */
export function validate(schema, property = 'body') {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      return next(new AppError(400, 'VALIDATION_ERROR', 'Input tidak valid', details));
    }

    req[property] = value;
    return next();
  };
}
