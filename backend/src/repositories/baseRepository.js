const baseRepository = (model) => {
  return {
    create: async (data) => {
      return model.create(data);
    },
    exists: async (filter) => {
      return model.exists(filter);
    },
    delete: async (filter) => {
      return model.deleteOne(filter);
    },
    /**
     * Fetch a single document from the collection
     * @param {Object} filter - The filter to find the document
     * @param {Object} [option] - Additional options for the query
     * @param {string} [option.select] - Fields to select in the document
     * @param {string} [option.populate] - Fields to populate in the document
     * @param {number} [option.skip] - Number of documents to skip
     * @param {number} [option.limit] - Maximum number of documents to return
     * @param {Object} [option.sort] - Sorting options for the query
     * @param {boolean} [option.lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
     * @returns {Promise<Object>}
     */
    get: async (filter = {}, option = {}) => {
      const {
        skip = 0,
        limit = 10,
        sort = {},
        select = null,
        populate = null,
        lean = true
      } = option;
      let query = model.find(filter).skip(skip).limit(limit).sort(sort);

      if (select) query.select(select);
      if (populate) query.populate(populate);
      if (lean) query.lean();
      return query;
    },

    /**
     *
     * Update a document in the collection
     * @param {Object} filter - The filter to find the document to update
     * @param {Object} updateData - The data to update the document with
     * @param {Object} [option] - Additional options for the update
     * @param {string} [option.select] - Fields to select in the updated document
     * @param {string} [option.populate] - Fields to populate in the updated document
     * @param {boolean} [option.lean=true] - Whether to return a plain JavaScript object instead of a Mongoose document
     * @returns {Promise<Object>} - The updated document
     * @throws {Error} - If the update operation fails
     * @description This function updates a document in the collection based on the provided filter and update data.
     * It returns the updated document, allowing for optional selection of fields and population of related documents.
     *
     */
    update: async (filter, updateData, option = {}) => {
      const { select = null, populate = null, lean = true } = option;

      let query = model.findOneAndUpdate(filter, updateData, {
        new: true,
        runValidators: true
      });
      if (select) query.select(select);
      if (populate) query.populate(populate);
      if (lean) query.lean();
      return query;
    },
    updateMany: async (filter, updateData, option = {}) => {
      const { select = null, populate = null, lean = true } = option;
      console.log(filter)

      let query = model.updateMany(filter, updateData, {
        new: true,
        runValidators: true
      });
      if (select) query.select(select);
      if (populate) query.populate(populate);
      if (lean) query.lean();
      return query;
    },
    count: async (filter) => {
      return model.countDocuments(filter);
    }
  };
};

export default baseRepository;
