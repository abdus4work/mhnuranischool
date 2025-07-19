import express from 'express';

import { generateSalary, getAllSalary, getSalary } from '../../controllers/salaryController.js';
import { authenticate, requireRole } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import { zodGenerateDuesSchema } from '../../validators/zodGenerateDuesSchema.js';

const salaryRouter = express.Router();

salaryRouter.use(authenticate);
salaryRouter.get(
  '/',
  requireRole(['admin']),
  getAllSalary
)
salaryRouter.patch(
  '/generate',
  requireRole(['admin']),
  validate(zodGenerateDuesSchema),
  generateSalary
);

salaryRouter.get(
  '/:staffId',
  requireRole(['admin']),
  getSalary
)

export default salaryRouter;
