import express from 'express';

import {
  generateFees,
  getAllFees,
  getFees
} from '../../controllers/feesController.js';
import { authenticate, requireRole } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import { zodGenerateDuesSchema } from '../../validators/zodGenerateDuesSchema.js';

const feesRouter = express.Router();

feesRouter.use(authenticate);
feesRouter.get('/', requireRole(['admin']), getAllFees);
feesRouter.patch(
  '/generate',
  requireRole(['admin']),
  validate(zodGenerateDuesSchema),
  generateFees
);

feesRouter.get(
  '/:studentId',
  requireRole(['admin', 'student'], 'studentId'),
  getFees
);

export default feesRouter;
