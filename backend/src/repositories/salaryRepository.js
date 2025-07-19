import SalaryModel from '../models/salaryModel.js';
import baseRepository from './baseRepository.js';

export const salaryRepository = {
  ...baseRepository(SalaryModel),
  hardDeleteMany: async (staffId) => {
    return await SalaryModel.deleteMany({ staffId });
  }
};
