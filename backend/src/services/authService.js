import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import authRepository from '../repositories/authRepository.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../utils/common/jwt.js';
import CustomError from '../utils/error/customError.js';
import { getStaffByIdService } from './staffService.js';
import { getStudentByIdService } from './studentService.js';

export const createStudentAuthService = async (authData) => {
  const existingAuth = await authRepository.exists({
    username: authData.username,
    deleted: false
  });
  if (existingAuth) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      'AUTH_EXISTS',
      `Authentication with username: ${authData.username} already exists. Please choose a different username.`
    );
  }
  return await authRepository.create(authData);
};

/**
 * Updates the authentication service with the provided filter and data.
 * @param {Object} filter - The filter to find the authentication record.
 * @param {Object} data - The data to update in the authentication record.
 * @param {Object} [options={}] - Additional options for the update operation.
 * @param {Object} [options.select] - Fields to select in the returned document.
 * @param {Object} [options.populate] - Fields to populate in the returned document.
 * @returns {Promise<Object>} - The updated authentication record.
 *
 */
export const updateAuthService = async (filter, data, options = {}) => {
  if (!data || typeof data != 'object' || Object.keys(data).length === 0) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'Invalid or empty data provided'
    );
  }

  const allowedFields = ['refreshToken', 'deleted', 'tokenVersion'];

  const toBeUpdate = allowedFields.reduce((acc, key) => {
    if (data[key] != null) acc[key] = data[key];
    return acc;
  }, {});

  //Handle inc operator
  const allowedIncFields = ['tokenVersion'];

  if (data['$inc']) {
    const $inc = {};
    for (const key in data['$inc']) {
      if (allowedIncFields.includes(key)) {
        $inc[key] = data['$inc'][key];
      } else {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          'ERR_INVALID_INC_FIELD',
          `Incrementing "${key}" is not allowed`
        );
      }
    }
    toBeUpdate['$inc'] = $inc;
  }

  if (Object.keys(toBeUpdate).length === 0) return;

  return await authRepository.update(filter, toBeUpdate, options);
};

//TODO: refactor deleted=false
export const LoginService = async ({ username, password }) => {
  //Find auth data by username
  let [authData] = await getAuthDataService({ username, deleted: false });

  if (!authData) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `User with username ${username} not found`
    );
  }

  if (!verifyPassword(password, authData.password)) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'ERR_UNAUTHORIZED',
      'Password not match'
    );
  }

  const selectFields = '-__v -deleted -createdAt -updatedAt -_id';

  const userData =
    authData.role === 'student'
      ? await getStudentByIdService(authData.linkedId, { select: selectFields })
      : await getStaffByIdService(authData.linkedId, { select: selectFields });

  if (!userData) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `User with ID ${authData.linkedId} not found`
    );
  }

  const newTokenVersion = authData.tokenVersion + 1;

  const accessToken = await generateAccessToken({
    userId: authData.linkedId,
    authId: authData._id,
    role: authData.role,
    tokenVersion: newTokenVersion
  });
  const refreshToken = await generateRefreshToken({
    authId: authData._id,
    tokenVersion: newTokenVersion
  });
  const updatedAuthData = await updateAuthByIdService(authData._id, {
    refreshToken,
    tokenVersion: newTokenVersion
  });

  return {
    ...userData,
    authId: authData._id,
    userId: authData.linkedId,
    username: authData.username,
    role: authData.role,
    token: accessToken,
    refreshToken: updatedAuthData.refreshToken
  };
};

export const logoutService = async (token) => {
  const { authId } = await verifyRefreshToken(token);
  const data = await updateAuthByIdService(authId, {
    refreshToken: '',
    $inc: { tokenVersion: 1 }
  });
  return data ? true : false;
};

export const refreshTokenService = async (token) => {
  if (!token) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'ERR_UNAUTHORIZED',
      'Token not provided'
    );
  }

  const { authId, tokenVersion } = await verifyRefreshToken(token);

  const authData = await getAuthByIdService(authId);

  if (
    !authData ||
    authData.tokenVersion !== tokenVersion ||
    authData.refreshToken !== token
  ) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'ERR_UNAUTHORIZED',
      'Invalid token provided'
    );
  }

  const newTokenVersion = authData.tokenVersion + 1;

  const newAccessToken = await generateAccessToken({
    userId: authData.linkedId,
    authId: authData._id,
    role: authData.role,
    tokenVersion: newTokenVersion
  });

  const newRefreshToken = await generateRefreshToken({
    authId: authData._id,
    tokenVersion: newTokenVersion
  });

  await updateAuthByIdService(authData._id, {
    refreshToken: newRefreshToken,
    tokenVersion: newTokenVersion
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

export const checkAdminExistsService = async () => {
  return authRepository.exists({ role: 'admin', deleted: false });
};

const verifyPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

/**
 * Retrieves authentication data based on the provided filter.
 * @param {Object} filter - The filter to find the authentication record.
 * @param {Object} [options={}] - Additional optionss for the query.
 * @param {Object} [options.select] - Fields to select in the returned document.
 * @param {Object} [options.populate] - Fields to populate in the returned document.
 * @returns {Promise<Array>} - An array of authentication records matching the filter.
 * @throws {CustomError} - Throws 404 if no authentication record is found.
 * @throws {CustomError} - Throws 400 if the filter is invalid.
 * @throws {CustomError} - Throws 500 if an error occurs during the database operation
 */
export const getAuthDataService = async (filter, options = {}) => {
  const data = await authRepository.get(filter, options);

  if (!data || data.length === 0) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      'Auth record not found'
    );
  }
  return data;
};

/**
 * Retrieves authentication data by ID.
 * @param {string} id - The ID of the authentication record.
 * @param {Object} [options={}] - Additional options for the query.
 * @param {string} [options.select='-__v'] - Fields to select in the returned document.
 * @param {string} [options.populate=''] - Fields to populate in the returned document.
 * @param {boolean} [options.isDeleted=false] - Whether to include deleted records.
 * @returns {Promise<Object>} - The authentication record with the specified ID.
 * @throws {CustomError} - Throws 400 if the ID is not provided.
 * @throws {CustomError} - Throws 404 if the authentication record is not found.
 * @throws {CustomError} - Throws 500 if an error occurs during the database operation
 */
export const getAuthByIdService = async (id, options = {}) => {
  if (!id) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'ID is required to get authentication data'
    );
  }
  const data = await authRepository.getAuthById(id, options);

  if (!data) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Auth record with ID ${id} not found`
    );
  }
  return data;
};

/**
 * Updates an authentication record by its ID.
 * @param {string} id - ID of the authentication record to update.
 * @param {Object} data - Data to update in the authentication record.
 * @param {Object} [options={}] - options for the update operation.
 * @param {string} [options.select='-__v'] - Fields to select in the updated document.
 * @param {string} [options.populate=''] - Related documents to populate in the updated document.
 * @param {boolean} [options.isDeleted=false] - Whether to include deleted records.
 * @returns {Promise<Object>} - The updated authentication record.
 */
export const updateAuthByIdService = async (id, data, options = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'A valid MongoDB ObjectId is required to update authentication data'
    );
  }
  const {
    isDeleted = false,
    select = '-__v -password -deleted',
    populate = ''
  } = options;
  const updatedData = await updateAuthService(
    { _id: id, deleted: isDeleted },
    data,
    { select, isDeleted, populate }
  );

  if (!updatedData) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Auth record with ID ${id} not found`
    );
  }
  return updatedData;
};
