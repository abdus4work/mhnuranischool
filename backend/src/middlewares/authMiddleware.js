import { StatusCodes } from 'http-status-codes';

import { getAuthByIdService } from '../services/authService.js';
import { verifyAccessToken } from '../utils/common/jwt.js';
import CustomError from '../utils/error/customError.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'ERR_UNAUTHORIZED',
      'No access token provided'
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyAccessToken(token);

    const authData = await getAuthByIdService(decoded.authId, {
      select: 'tokenVersion'
    });

    if (decoded.tokenVersion !== authData.tokenVersion) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'ERR_UNAUTHORIZED',
        'Token has been revoked'
      );
    }

    req.user = {
      userId: decoded.userId,
      authId: decoded.authId,
      role: decoded.role
    };
    next();
  } catch (error) {
    const status = error.statusCode || StatusCodes.UNAUTHORIZED;
    const message = error.message || 'Invalid or expired token';

    next(
      new CustomError(
        status,
        status === StatusCodes.FORBIDDEN ? 'ERR_FORBIDDEN' : 'ERR_UNAUTHORIZED',
        `Token error: ${message}`
      )
    );
  }
};

export const requireRole = (allowedRoles = ['admin'], paramKey = 'id') => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    const userId = req.user?.userId;
    const targetId = req.params?.[paramKey] || req.query?.[paramKey];

    if (!userRole) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'ERR_UNAUTHORIZED',
        'User role not found in request'
      );
    }

    // Admin role is always allowed
    if (userRole === 'admin' && allowedRoles.includes('admin')) {
      return next();
    }

    // If no targetId is provided, allow access if the user has the required role
    if (allowedRoles.includes(userRole) && userId === targetId) {
      return next();
    }

    throw new CustomError(
      StatusCodes.FORBIDDEN,
      'ERR_FORBIDDEN',
      `Access denied: insufficient permissions`
    );
  };
};
