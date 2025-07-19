import { StatusCodes } from 'http-status-codes';

import {
  createStaffService,
  deleteStaffService,
  getAllStaffService,
  updateStaffById
} from '../services/staffService.js';
import SuccessResponse from '../utils/common/successResponse.js';

export const createStaff = async (req, res, next) => {
  try {
    const data = req.body;

    const staffData = await createStaffService(data);

    res
      .status(StatusCodes.CREATED)
      .json(
        new SuccessResponse(
          StatusCodes.CREATED,
          'Staff created successfully',
          staffData
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getAllStaff = async (req, res, next) => {
  try {
    const query = req.query;

    query.page = parseInt(query.page) || 1;
    query.limit = parseInt(query.limit) || 10;

    const { staffs, totalDocuments } = await getAllStaffService(query);
    res.status(StatusCodes.OK).json(
      new SuccessResponse(
        StatusCodes.OK,
        'Staff fetched successfully',
        staffs,
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

export const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStaff = await deleteStaffService(id);
    res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'Staff deleted successfully',
          deletedStaff
        )
      );
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const callerRole = req.user.role;

    const updatedStaff = await updateStaffById(id, data, { callerRole });
    res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'Staff updated successfully',
          updatedStaff
        )
      );
  } catch (error) {
    next(error);
  }
};
