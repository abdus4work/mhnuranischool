import StaffModel from '../models/staffModel.js';
import { parseSelectToProject } from '../utils/common/selectToProject.js';
import baseRepository from './baseRepository.js';

const staffRepository = {
  ...baseRepository(StaffModel),

  /**
   * @typedef {Object} QueryOptions
   * @property {string} [select='-__v'] - Fields to select in the authentication record
   * @property {string} [populate=''] - Related documents to populate
   * @property {boolean} [isDeleted=false] - Whether to include deleted records
   * @property {boolean} [lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
   */
  /**
   * Fetches a staff member by their ID.
   * @param {string} id - The ID of the staff member to retrieve.
   * @param {QueryOptions} [options={}] - Additional options for the query.
   * @returns {Promise<Object>} - The staff member with the specified ID.
   * @throws {CustomError} - Throws 400 if the ID is not provided.
   * @throws {CustomError} - Throws 404 if the staff member is not found.
   * @throws {CustomError} - Throws 500 if an error occurs during the database operation.
   */
  getStaffById: async (id, options = {}) => {
    const {
      select = '-__v',
      populate = '',
      isDeleted = false,
      lean = true
    } = options;
    const query = StaffModel.findOne(
      { _id: id, deleted: isDeleted },
      select
    ).populate(populate);

    if (lean) query.lean();
    return query;
  },
  getStaffWithAuthInfo: async (filter = {}, options = {}) => {
    const { skip = 0, limit = 10, select = '', isDeleted = false } = options;

    const projectStage = parseSelectToProject(select);

    const pipeline = [
      { $match: { ...filter, deleted: isDeleted } },
      {
        $lookup: {
          from: 'userauths',
          localField: '_id',
          foreignField: 'linkedId',
          as: 'authInfo'
        }
      },
      { $unwind: '$authInfo' }
    ];

    const totalPipeline = [...pipeline, { $count: 'total' }];

    pipeline.push(
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          role: { $toUpper: '$authInfo.role' }
        }
      },
      { $project: { ...projectStage, authInfo: 0 } }
    );
    const [data, totalData] = await Promise.all([
      StaffModel.aggregate(pipeline),
      StaffModel.aggregate(totalPipeline)
    ]);


    return { data, totalData: totalData[0]?.total };
  }
};

export default staffRepository;
