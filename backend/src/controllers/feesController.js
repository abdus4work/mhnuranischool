import { StatusCodes } from 'http-status-codes';

import {
  generateFeesService,
  getAllFeesService
} from '../services/feesService.js';
import SuccessResponse from '../utils/common/successResponse.js';

export const getAllFees = async (req, res, next) => {
  try {
    const query = req.query;
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    query.page = page;
    query.limit = limit;
    const { feesRecords, totalDocuments } = await getAllFeesService(query);
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(
        StatusCodes.OK,
        'Fees records retrieved successfully',
        feesRecords,
        {
          totalDocuments,
          currentPage: query.page,
          totalPage: Math.ceil(totalDocuments / (query.limit || 10)),
          limit: query.limit
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

export const generateFees = async (req, res, next) => {
  try {
    const data = await generateFeesService(req.body);
    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(StatusCodes.OK, 'Fees generated successfully', data)
      );
  } catch (error) {
    next(error);
  }
};

export const getFees = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const {feesRecords} = await getAllFeesService({ studentId,limit:12 });
    if (!feesRecords || feesRecords.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json(
          new SuccessResponse(
            StatusCodes.OK,
            'No fees records found for the provided student ID',
            []
          )
        );
    }

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'Fees records retrieved successfully',
          feesRecords
        )
      );
  } catch (error) {
    next(error);
  }
};
