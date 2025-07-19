import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import { salaryRepository } from '../repositories/salaryRepository.js';
import CustomError from '../utils/error/customError.js';

export const createSalaryService = async (data) => {
  return await salaryRepository.create(data);
};

export const hardDeleteManySalaryService = async (staffId) => {
  return await salaryRepository.hardDeleteMany(staffId);
};

export const updateSalaryService = async (filter, updateData, options) => {
  if (!filter.staffId || !mongoose.Types.ObjectId.isValid(filter.staffId)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_ID',
      'Invalid staff ID provided.'
    );
  }

  console.log(updateData);
  const updatedSalary = await salaryRepository.update(
    filter,
    updateData,
    options
  );

  if (!updatedSalary) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_SALARY_NOT_FOUND',
      'Salary record not found for the provided staff ID.'
    );
  }

  return updatedSalary;
};

export const generateSalaryService = async ({ month, year }) => {
  if (!month || !year) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_INVALID_DATA',
      'Month and year are required to generate salary.'
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
  console.log(filter);
  const updatedFees = await salaryRepository.updateMany(filter, toBeUpdated);
  if (!updatedFees.acknowledged) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_FEES_NOT_FOUND',
      'No fees records found to generate for the provided month and year.'
    );
  }
  return updatedFees;
};

export const getAllSalaryService = async (query) => {
  const {
    page = 1,
    limit = 10,
    month = undefined,
    status = 'all',
    year = undefined,
    staffId = undefined
  } = query;
  const skip = (page - 1) * limit;
  const filter = {
    deleted: false,
    generated: true,
    ...(month && { month: Number(month) }),
    ...(year && { year: Number(year) }),
    ...(staffId && { staffId: staffId }),
    ...(status.toUpperCase() !== 'ALL' && { status: status.toUpperCase() })
  };

  const salaries = await salaryRepository.get(filter, {
    populate: { path: 'staffId', select: 'fullName employeeId' },
    skip,
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    select: '-deleted -__v'
  });

  const totalDocuments = await salaryRepository.count(filter);
  return {
    salaries,
    totalDocuments
  };
};
