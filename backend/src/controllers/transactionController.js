import { StatusCodes } from 'http-status-codes';

import { createTransactionService, getAllTransactionService, getTransactionService } from '../services/transactionService.js';
import SuccessResponse from '../utils/common/successResponse.js';

export const createTransaction = async (req, res, next) => {
  try {
    const data = await createTransactionService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(
        new SuccessResponse(
          StatusCodes.CREATED,
          'Transaction created successfully',
          data
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getAllTransaction=async(req,res,next)=>{
  try {
    const query = req.query;
    query.page = parseInt(query.page) || 1;
    query.limit = parseInt(query.limit) || 10;

    const {totalDocuments,transactions}=await getAllTransactionService(query);
    if(!transactions || transactions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json(
        new SuccessResponse(
          StatusCodes.NOT_FOUND,
          'No transactions found'
        )
      );
    }

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(
        StatusCodes.OK,
        'Transaction Fetched successfully',
        transactions,
        {
          totalDocuments,
          totalPages: Math.ceil(totalDocuments / query.limit),
          currentPage: query.page,
          limit: query.limit
        }
      )
    )
  } catch (error) {
    next(error)
  }
}

export const getTransaction = async (req, res, next) => {
  try {
    const {paymentId} = req.params;
    const transaction = await getTransactionService(paymentId);
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(
        StatusCodes.OK,
        'Transaction fetched successfully',
        transaction
      )
    );
  } catch (error) {
    next(error);
    
  }
}