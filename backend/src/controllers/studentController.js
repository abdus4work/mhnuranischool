import { StatusCodes } from 'http-status-codes';

import {
  createStudentService,
  deleteStudentService,
  getStudentsService,
  updateStudentByIdService
} from '../services/studentService.js';
import SuccessResponse from '../utils/common/successResponse.js';

export const createStudent = async (req, res, next) => {
  try {
    const data = await createStudentService(req.body);
    res
      .status(StatusCodes.CREATED)
      .json(
        new SuccessResponse(
          StatusCodes.CREATED,
          'Student created successfully',
          data
        )
      );
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const query = req.validatedQuery;
    
    query.page = parseInt(query.page) || 1;
    query.limit = parseInt(query.limit) || 10;

    const { students, totalDocuments } = await getStudentsService(query);

    res.status(StatusCodes.OK).json(
      new SuccessResponse(
        StatusCodes.OK,
        'Students fetched successfully',
        students,
        {
          totalDocuments,
          currentPage: query.page,
          totalPage: Math.ceil(totalDocuments / (query.limit || 10)),
          limit: query.limit || 10
        }
      )
    );
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const data = await deleteStudentService(id);
    res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'Student deleted successfully',
          data
        )
      );
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const toBeUpdate = req.body;
    const data = await updateStudentByIdService(id, toBeUpdate, {
      queryOptions: { select: '-__v -createdAt -updatedAt -deletedAt' }
    });
    res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'Student updated successfully',
          data
        )
      );
  } catch (err) {
    next(err);
  }
};
