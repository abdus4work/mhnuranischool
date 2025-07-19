import { StatusCodes } from 'http-status-codes';

import { generateSalaryService, getAllSalaryService } from '../services/salaryService.js';
import SuccessResponse from '../utils/common/successResponse.js';


export const getAllSalary = async (req, res, next) => {
  try {
    const query = req.query;
    query.page = query.page ? parseInt(query.page) : 1;
    query.limit = query.limit ? parseInt(query.limit) : 10;
    const {salaries,totalDocuments} = await getAllSalaryService(query)
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse(StatusCodes.OK, 'Salaries fetched successfully', salaries,{
        currentPage: query.page,
        limit: query.limit,
        totalDocuments,
        totalPage: Math.ceil(totalDocuments / query.limit)
      }));
  } catch (error) {
    next(error);
  }
}

export const generateSalary = async (req, res, next) => {
  try {
    const data = await generateSalaryService(req.body);
    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(StatusCodes.OK, 'Salary generated successfully',data)
      );
  } catch (error) {
    next(error);
  }
};

export const getSalary = async (req, res, next) => {
  try {
    const {staffId} = req.params;
    const {salaries} = await getAllSalaryService({staffId,limit:12})
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse(StatusCodes.OK, 'Salary fetched successfully', salaries));
  } catch (error) {
    next(error);
    
  }
}
