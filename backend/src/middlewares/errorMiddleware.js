import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

import ErrorResponse from '../utils/common/errorResponse.js';
import logger from '../utils/common/logger.js';
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  // Logging the error
  console.log(err);
  
  logger.error('Error occurred', {
    message: err.message || 'Unknown error',
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errorCode: err.errorCode || 'INTERNAL_SERVER_ERROR',
    details: err.details || null,
    data: err.data || null
  });

  //zod validation error
  if (err instanceof ZodError) {
    const message = err.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    const details = err.errors.map((e) => {
      return {
        field: e.path[0],
        message: e.message
      };
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'INVALID_INPUT',
      message: message,
      details: details,
      data: null
    });
  }
  // Duplicate key error
  if (err.code && err.code === 11000) {
    const details = Object.keys(err.keyValue).map((key) => {
      return {
        field: key,
        message: `Duplicate value for field: ${key}`
      };
    });
    return res
      .status(StatusCodes.CONFLICT)
      .json(
        new ErrorResponse(
          StatusCodes.CONFLICT,
          'DUPLICATE_KEY_ERROR',
          `Duplicate key error: ${Object.keys(err.keyValue).join(', ')}`,
          details,
          null
        )
      );
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => `${e.path}: ${e.message}`)
      .join(', ');
    const details = Object.values(err.errors).map((e) => {
      return {
        field: e.path,
        message: e.message
      };
    });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ErrorResponse(
          StatusCodes.BAD_REQUEST,
          'VALIDATION_ERROR',
          message,
          details,
          null
        )
      );
  }

  // Generic error handling

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      new ErrorResponse(
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        err.errorCode || 'INTERNAL_SERVER_ERROR',
        err.message || 'An unexpected error occurred',
        err.details || null,
        err.data || null
      )
    );
};

export default errorMiddleware;
