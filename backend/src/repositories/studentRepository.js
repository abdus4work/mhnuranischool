import StudentModel from '../models/studentModel.js';
import baseRepository from './baseRepository.js';

const studentRepository = {
  ...baseRepository(StudentModel),
  /**
   * @typedef {Object} QueryOptions
   * @property {string} [select='-__v'] - Fields to select in the authentication record
   * @property {string} [populate=''] - Related documents to populate
   * @property {boolean} [isDeleted=false] - Whether to include deleted records
   * @property {boolean} [lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
   */

  /**
   * Fetches a student by their ID.
   * @param {string} id - The ID of the student to fetch.
   * @param {QueryOptions} [option={}] - Additional options for the query.
   * @returns {Promise<Object>} - The student record with the specified ID.
   */
  getById:async (id,option={})=>{
    const {select='-__v',isDeleted=false,lean=true}=option;
    const query = StudentModel.findOne({_id:id,deleted:isDeleted}).select(select);
    if(lean) query.lean();
    return query;
  }
};

export default studentRepository;
