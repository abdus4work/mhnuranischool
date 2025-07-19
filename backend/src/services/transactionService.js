import { StatusCodes } from 'http-status-codes';

import { feesRepository } from '../repositories/feesRepository.js';
import { salaryRepository } from '../repositories/salaryRepository.js';
import { transactionRepository } from '../repositories/transactionRepository.js';
import CustomError from '../utils/error/customError.js';
import { getFormattedSequence } from './counterService.js';
import { updateFeesService } from './feesService.js';
import { updateSalaryService } from './salaryService.js';

export const createTransactionService = async (data) => {
  const { payee, type, month, year, ...paymentDetails } = data;

  const filter =
    type === 'FEES'
      ? { studentId: payee, month, year }
      : { staffId: payee, month, year };

  const payableExists =
    type === 'FEES'
      ? await feesRepository.exists(filter)
      : await salaryRepository.exists(filter);

  if (!payableExists) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_PAYABLE_NOT_FOUND',
      `No payable found for the provided ${type === 'FEES' ? 'student' : 'staff'} ID.`
    );
  }
  const counterId = type === 'FEES' ? 'transactionId' : 'salaryId';
  const paymentId = await getFormattedSequence(
    counterId,
    type.slice(0, 3).toUpperCase()
  );

  if (!paymentId) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'ERR_PAYMENT_ID_GENERATION',
      'Failed to generate payment ID.'
    );
  }
  const payment = await transactionRepository.create({
    payee,
    type,
    paymentId,
    month,
    year,
    ...paymentDetails
  });

  try {
    if (type === 'FEES') {
      await updateFeesService(filter, {
        paymentRef: payment._id,
        status: 'PAID',
        generated: true
      });
    } else if (type === 'SALARY') {
      await updateSalaryService(filter, {
        paymentRef: payment._id,
        status: 'PAID',
        generated: true
      });
    }
  } catch (error) {
    console.log(error);
    if (type === 'FEES') {
      await transactionRepository.delete({ _id: payment._id });
    }
    if (type === 'SALARY') {
      await transactionRepository.delete({ _id: payment._id });
    }
  }

  return {
    paymentId
  };
};

export const getAllTransactionService = async (query) => {
  const {
    page = 1,
    limit = 10,
    type = 'all',
    month = undefined,
    year = undefined,
    paymentId = undefined
  } = query;
  const skip = (page - 1) * limit;

  const filter = {
    deleted: false,
    ...(type !== 'all' && { type: type.toUpperCase() }),
    ...(month && { month: Number(month) }),
    ...(year && { year: Number(year) }),
    ...(paymentId && { paymentId: paymentId.toUpperCase() })
  };

  const transactions = await transactionRepository.get(filter, {
    populate: { path: 'payee', select: 'fullName' },
    skip,
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    select: '-deleted -__v -createdAt -updatedAt'
  });

  const totalDocuments = await transactionRepository.count(filter);
  return {
    transactions,
    totalDocuments
  };
};

export const getTransactionService = async (paymentId) => {
  const transaction = await transactionRepository.getByPaymentId(paymentId, {
    select: '-deleted -__v -createdAt -updatedAt',
    populate: { path: 'payee', select: 'fullName class section rollNumber' }
  });
  if (!transaction) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_TRANSACTION_NOT_FOUND',
      'Transaction not found for the provided payment ID.'
    );
  }
  return transaction;
};
