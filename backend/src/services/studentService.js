import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import studentRepository from '../repositories/studentRepository.js';
import CustomError from '../utils/error/customError.js';
import { createStudentAuthService, updateAuthService } from './authService.js';
import {
  createFeesService,
  deleteFeesByStudentIdService,
  hardDeleteManyFeesService
} from './feesService.js';

/**
 * Create a new student and their authentication credentials
 *
 * @param {Object} data - Student data including username and password
 * @param {string} data.username - Username for the student
 * @param {string} data.password - Password for the student
 * @param {Object} data.studentData - Other student details
 * @param {string} data.studentData.fullName - Full name of the student
 * @param {string} data.studentData.class - Class of the student
 * @param {string} data.studentData.section - Section of the student
 * @param {string} data.studentData.rollNumber - Roll number of the student
 * @param {string} data.studentData.guardianName - Guardian's name
 * @param {string} data.studentData.guardianContact - Guardian's contact number
 * @param {string} data.studentData.address - Address of the student
 * @param {string} [data.studentData.email] - Email of the student (optional)
 * @param {string} [data.studentData.dateOfBirth] - DOB of the student (optional)
 * @param {Date} [data.studentData.admissionDate] - Admission date of the student (optional)
 * @param {string} [data.studentData.academicYear] - Academic year of the student (optional)
 *
 * @returns {Promise<Object>} - An object containing the student ID and username
 * @throws {CustomError} - Throws 409 if the student already exists
 * @throws {CustomError} - Throws 500 if authentication creation fails
 */
export const createStudentService = async (data) => {
  const { username, password, monthlyFees, ...studentData } = data;

  const studentExists = await studentRepository.exists({
    class: studentData.class,
    rollNumber: studentData.rollNumber,
    section: studentData.section,
    deleted: false
  });

  if (studentExists) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      'STUDENT_EXISTS',
      `Student with Class: ${studentData.class}, Roll number: ${studentData.rollNumber}, and Section: ${studentData.section} already exists.`
    );
  }

  const newStudent = await studentRepository.create(studentData);

  try {
    for (let month = 1; month <= 12; month++) {
      await createFeesService({
        studentId: newStudent._id,
        month,
        year:
          studentData.academicYear || studentData.admissionDate.getFullYear(),
        monthlyFees
      });
    }
  } catch (error) {
    //delete the student if fees creation fails
    await studentRepository.delete({ _id: newStudent._id });
    await hardDeleteManyFeesService({ studentId: newStudent._id });

    throw new CustomError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorCode || 'FEES_CREATION_FAILED',
      error.message || 'Failed to create student fees record.'
    );
  }

  let studentCredentials;
  try {
    studentCredentials = await createStudentAuthService({
      username,
      password,
      linkedId: newStudent._id.toString(),
      role: 'student'
    });
  } catch (error) {
    //delete the student if auth creation fails
    await studentRepository.delete({ _id: newStudent._id });
    await hardDeleteManyFeesService({ studentId: newStudent._id });

    throw new CustomError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorCode || 'AUTH_CREATION_FAILED',
      error.message || 'Failed to create student authentication credentials.'
    );
  }

  return {
    studentId: newStudent._id.toString(),
    username: studentCredentials.username
  };
};

/**
 * Get students with pagination and filtering
 *
 * @param {Object} query - Query parameters for pagination and filtering
 * @param {number} [query.page] - Page number for pagination
 * @param {number} [query.limit] - Number of students per page
 * @param {string} [query.className] - Class name to filter students
 * @param {string} [query.roll] - Roll number to filter students
 * @param {string} [query.sec] - Section to filter students
 * @returns {Promise<Object>} - An object containing the list of students and total document count
 *
 */
export const getStudentsService = async (query) => {
  let { page, limit, class: className, roll, sec } = query;

  const filter = {};
  if (className) filter.class = className;
  if (roll) filter.rollNumber = roll;
  if (sec) filter.section = sec;

  const students = await studentRepository.get(
    { ...filter, deleted: false },
    {
      skip: (page - 1) * limit,
      limit,
      select: '-__v -deleted -createdAt -updatedAt'
    }
  );
  const totalDocuments = await studentRepository.count({
    ...filter,
    deleted: false
  });
  return {
    students,
    totalDocuments
  };
};

/**
 * Delete a student by ID
 *
 * @param {string} id - The student's ID
 * @returns {Promise<Object>} - The deleted student document
 * @throws {CustomError} - Throws 400 if the id is invalid
 * @throws {CustomError} - Throws 404 if the student does not exist
 * @throws {CustomError} - Throws 500 if an error occurs during deletion
 */
export const deleteStudentService = async (id) => {
  const existingStudent = await studentRepository.get({
    _id: id,
    deleted: false
  });

  if (!existingStudent || existingStudent.length === 0) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Student with id ${id} not found`
    );
  }

  const deletedStudent = await updateStudentByIdService(
    id,
    {
      deleted: true,
      deletedAt: new Date()
    },
    {
      filter: { deleted: false },
      queryOptions: { select: '-__v -createdAt -updatedAt' }
    }
  );

  if (deletedStudent.deleted !== true) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'ERR_INTERNAL_SERVER_ERROR',
      'Error occurred when deleting student'
    );
  }
  try {
    // Delete fees records associated with the student
    await deleteFeesByStudentIdService({ studentId: deletedStudent._id });
    await updateAuthService(
      { linkedId: deletedStudent._id, deleted: false },
      { deleted: true, deletedAt: new Date() }
    );
  } catch (err) {
    await updateStudentByIdService(
      id,
      { deleted: false, deletedAt: '' },
      { filter: { deleted: true } }
    );
    throw err;
  }

  return deletedStudent;
};

/**
 *
 * Update a student by ID
 * @param {string} id - The student's ID
 * @param {Object} data - The data to update the student with
 * @param {Object} [options] - Additional options for the update
 * @param {Object} [options.filter] - Filter to apply for the update
 * @param {Object} [options.queryOptions] - Additional query options for the update
 * @param {string} [options.queryOptions.select] - Fields to select in the updated document
 * @param {string} [options.queryOptions.populate] - Fields to populate in the updated document
 * @returns {Promise<Object>} - The updated student document
 * @throws {CustomError} - Throws 400 if the id is invalid or data is empty
 */
export const updateStudentByIdService = async (id, data, options = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'Invalid id'
    );
  }

  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'Invalid or empty data provided for update'
    );
  }

  const { filter = { deleted: false }, queryOptions = {} } = options;

  const {
    fullName,
    guardianName,
    guardianContact,
    address,
    email,
    deleted,
    deletedAt,
    admissionDate,
    academicYear
  } = data;

  const toBeUpdate = {
    ...(fullName && { fullName }),
    ...(guardianName && { guardianName }),
    ...(guardianContact && { guardianContact }),
    ...(address && { address }),
    ...(email && { email }),
    ...(deleted !== undefined && { deleted }), // in case deleted is false
    ...(deletedAt && { deletedAt }),
    ...(academicYear && { academicYear }),
    ...(admissionDate && { admissionDate })
  };

  if (Object.keys(toBeUpdate).length === 0) return;

  const isExistsStudent = await getStudentByIdService(id);

  if (!isExistsStudent) return;

  const updatedStudent = await studentRepository.update(
    { _id: id, ...filter },
    toBeUpdate,
    { ...queryOptions }
  );

  return updatedStudent;
};

/**
 * Get a student by ID
 *
 * @param {string} id - The student's ID
 * @param {Object} [option] - Additional options for the query
 * @param {string} [option.select='-__v'] - Fields to select in the returned document
 * @param {boolean} [option.isDeleted=false] - Whether to include deleted records
 * @returns {Promise<Object>} - The student document
 * @throws {CustomError} - Throws 400 if the id is invalid
 * @throws {CustomError} - Throws 404 if the student does not exist
 */
export const getStudentByIdService = async (id, option = {}) => {
  // Validate the provided ID
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    // Throw an error if ID is invalid
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      'ERR_BAD_REQUEST',
      'Invalid id'
    );
  }

  // Attempt to retrieve the student by ID
  const data = await studentRepository.getById(id, option);

  // If no student is found, throw a not found error
  if (!data) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      'ERR_NOT_FOUND',
      `Student with ${id} not found`
    );
  }

  // Return the found student data
  return data;
};
