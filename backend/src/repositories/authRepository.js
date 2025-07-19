import AuthModel from '../models/authUserModel.js';
import baseRepository from './baseRepository.js';

const authRepository = {
  ...baseRepository(AuthModel),

  /**
   * @typedef {Object} QueryOptions
   * @property {string} [select='-__v'] - Fields to select in the authentication record
   * @property {string} [populate=''] - Related documents to populate
   * @property {boolean} [isDeleted=false] - Whether to include deleted records
   * @property {boolean} [lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
   */

  /**
   *
   * @param {string} id ID of the authentication record
   * @param {QueryOptions} options Options for selecting fields and populating related documents
   * @returns {Promise<Object>} The authentication record with the specified ID
   */
  getAuthById: async (id, options = {}) => {
    const {
      select = '-__v',
      populate = '',
      isDeleted = false,
      lean = true
    } = options;
    const query = AuthModel.findOne(
      { _id: id, deleted: isDeleted },
      select
    ).populate(populate);
    if (lean) query.lean();
    return query;
  },
  
};

export default authRepository;
