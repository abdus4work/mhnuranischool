import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import { feesRepository } from '../repositories/feesRepository.js';
import CustomError from '../utils/error/customError.js';

export const createFeesService = async (data) => {
  return await feesRepository.create(data);
};

export const hardDeleteFeesService = (id) => {
  return feesRepository.delete({ _id: id });
};

export const getFeesByStudentIdService = async (studentId) => {
  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid student ID provided.'
    );
  }

  const feesRecord = await feesRepository.getByStudentID(studentId);
  if (!feesRecord) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_FEES_NOT_FOUND',
      'Fees record not found for the provided student ID.'
    );
  }
  return feesRecord;
};

/**
 * @param {string} studentId - The ID of the student whose fees record needs to be updated.
 * @param {Object} updateData - The data to update the fees record with.
 * @param {Object} [options] - Additional options for the update operation.
 * @param {Object} [options.select] - Fields to select in the updated document.
 * @param {Object} [options.populate] - Fields to populate in the updated document.
 * @param {boolean} [options.lean] - Whether to return a plain JavaScript
 */
export const updateFeesByStudentIdService = async (
  studentId,
  updateData,
  options
) => {
  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid student ID provided.'
    );
  }

  const updatedFees = await feesRepository.update(
    { studentId },
    updateData,
    options
  );

  if (!updatedFees) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_FEES_NOT_FOUND',
      'Fees record not found for the provided student ID.'
    );
  }

  return updatedFees;
};

export const updateFeesService = async (filter, data, options) => {
  const allowedFields = [
    'status',
    'monthlyFees',
    'paymentRef',
    'generated',
    'deleted'
  ];
  const toBeUpdated = Object.keys(data).reduce((acc, key) => {
    if (data[key] && allowedFields.includes(key)) {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  if (Object.keys(toBeUpdated).length === 0) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_UPDATE_DATA',
      'No valid fields or no data provided for update.'
    );
  }

  const updatedFees = await feesRepository.update(filter, toBeUpdated, options);
  if (!updatedFees) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_FEES_NOT_FOUND',
      'Fees record not found for the provided filter.'
    );
  }
  return updatedFees;
};

export const getAllFeesService = async (query) => {
  const {
    page = 1,
    limit = 10,
    class: className,
    roll,
    section,
    month,
    year,
    status,
    studentId
  } = query;

  if(studentId && !mongoose.Types.ObjectId.isValid(studentId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid student ID provided.'
    );
  }

  const filter = {};
  if (className) filter.class = className;
  if (roll) filter.roll = roll;
  if (section) filter.section = section;
  if (month && month !== '0') filter.month =parseInt(month);
  if (year) filter.year = parseInt(year);
  if (status && status !== 'all') filter.status = status.toUpperCase();
  if (studentId) filter.studentId = studentId;


  const { feesRecords, totalDocuments } = await feesRepository.getAllFees({
    skip: (page - 1) * limit,
    limit,
    ...filter
  });


  return { feesRecords, totalDocuments };
};

export const hardDeleteManyFeesService = async (studentId) => {
  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid student ID provided.'
    );
  }

  const deletedFees = await feesRepository.hardDeleteMany({ studentId });
  return deletedFees;
};

export const generateFeesService = async ({ month, year }) => {
  if (!month || !year) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_DATA',
      'Month and year are required to generate fees.'
    );
  }
  const toBeUpdated = {
    status: 'DUE',
    generated: true
  };
  const filter = {
    month,
    year,
    generated: false,
    deleted: false
  };
  const updatedFees = await feesRepository.updateMany(filter, toBeUpdated);
  if (!updatedFees) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_FEES_NOT_FOUND',
      'No fees records found to generate for the provided month and year.'
    );
  }
  return updatedFees;
};


export const deleteFeesByStudentIdService = async(studentId)=>{
  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid student ID provided.'
    );
  }

  const deletedFees = await feesRepository.updateMany({ studentId }, { deleted: true });
  return deletedFees;
}