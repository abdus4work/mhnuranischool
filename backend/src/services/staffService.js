import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import authRepository from '../repositories/authRepository.js';
import staffRepository from '../repositories/staffRepository.js';
import CustomError from '../utils/error/customError.js';
import { updateAuthService } from './authService.js';
import { getFormattedSequence } from './counterService.js';
import {
  createSalaryService,
  hardDeleteManySalaryService
} from './salaryService.js';

/**
 * @typedef {Object} QueryOptions
 * @property {string} [select='-__v'] - Fields to select in the staff record
 * @property {string} [populate=''] - Related documents to populate
 * @property {boolean} [isDeleted=false] - Whether to include deleted records
 * @property {boolean} [lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
 */

export const createStaffService = async (data) => {
  const { password, salary, role, ...roleData } = data;

  const employeeId = await getFormattedSequence('staffId', 'EMP');

  const staffData = await staffRepository.create({ employeeId, ...roleData });

  if (!staffData) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'ERR_INTERNAL_SERVER_ERROR',
      'Failed to create staff member'
    );
  }

  let staffCredential;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  try {
    months.forEach(async (month) => {
      await createSalaryService({
        staffId: staffData._id,
        month,
        year: staffData.dateOfJoining.getFullYear(),
        monthlySalary: salary
      });
    });
  } catch (error) {
    await staffRepository.delete(staffData._id);
    await hardDeleteManySalaryService(staffData._id);
    throw new CustomError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorCode || 'SALARY_CREATION_FAILED',
      error.message || 'Failed to create staff salary record.'
    );
  }

  try {
    staffCredential = await authRepository.create({
      username: employeeId,
      password,
      role,
      linkedId: staffData._id
    });
  } catch (error) {
    await staffRepository.delete(staffData._id);
    throw new CustomError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorCode || 'AUTH_CREATION_FAILED',
      error.message || 'Failed to create student authentication credentials.'
    );
  }
  return {
    username: staffCredential.username
  };
};

/**
 *
 * @param {string} id - ID of the staff member
 * @param {QueryOptions} [options={}] - Additional options for the query
 * @returns {Promise<Object>} - The staff member with the specified ID
 */
export const getStaffByIdService = async (id, options = {}) => {
  if (!id) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'Staff ID is required'
    );
  }

  const data = await staffRepository.getStaffById(id, options);

  if (!data) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Staff member with ID ${id} not found`
    );
  }
  return data;
};

export const getAllStaffService = async (query) => {
  const { page, limit, employeeId = null } = query;

  const filter = {};
  if (employeeId) filter.employeeId = employeeId.toUpperCase();
  const { data, totalData } = await staffRepository.getStaffWithAuthInfo(
    filter,
    {
      role: 'teacher',
      skip: (page - 1) * limit,
      limit: limit,
      select: '-__v -createdAt -updatedAt -deleted'
    }
  );

  return {
    staffs: data,
    totalDocuments: totalData
  };
};

export const deleteStaffService = async (id) => {
  const staff = await updateStaffById(
    id,
    { deleted: true },
    { callerRole: 'admin' }
  );

  try {
    await updateAuthService({ linkedId: staff._id }, { deleted: true });
  } catch (error) {
    await updateStaffById(id, { deleted: false }, { callerRole: 'admin' });
    throw new CustomError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorCode || 'ERR_DELETE_FAILED',
      error.message || 'Failed to delete staff'
    );
  }
  return staff._id;
};

export const updateStaffById = async (id, data, options = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'A valid staff ID is required'
    );
  }
  const {
    select = '-__v -createdAt -updatedAt -deleted',
    populate = '',
    isDeleted = false,
    callerRole = 'staff'
  } = options;

  const allowedUpdates = ['email', 'contactNumber', 'address'];

  if (callerRole === 'admin') {
    allowedUpdates.push('fullName', 'dateOfJoining', 'deleted');
  }

  const toBeUpdated = allowedUpdates.reduce((acc, key) => {
    if (data[key] != null) acc[key] = data[key];
    return acc;
  }, {});

  if (Object.keys(toBeUpdated).length === 0) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'No valid fields to update'
    );
  }

  const updatedStaff = await staffRepository.update(
    { _id: id, deleted: isDeleted },
    toBeUpdated,
    { select, populate }
  );

  if (!updatedStaff) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Staff member with ID ${id} not found or already deleted`
    );
  }

  return updatedStaff;
};
