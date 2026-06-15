import { AppError } from "./AppError.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // If it's already an AppError, we can just pass it
      if (err instanceof AppError) {
        return next(err);
      }
      return next(new AppError(err.message, 500));
    });
  };
};

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    err: err.message,
    stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined,
  });
};
