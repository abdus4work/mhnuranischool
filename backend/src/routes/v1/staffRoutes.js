import express from 'express';

import {
  createStaff,
  deleteStaff,
  getAllStaff,
  updateStaff
} from '../../controllers/staffController.js';
import { authenticate, requireRole } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import idParamSchema from '../../validators/idParamSchema.js';
import zodStaffSchema, {
  staffUpdateSchema
} from '../../validators/zodStaffSchema.js';

const staffRouter = express.Router();

staffRouter.post(
  '/',
  authenticate,
  requireRole(['admin']),
  validate(zodStaffSchema),
  createStaff
);
staffRouter.get('/', authenticate, requireRole(['admin']), getAllStaff);
staffRouter.delete(
  '/:id',
  authenticate,
  requireRole(['admin']),
  validate(idParamSchema, 'params'),
  deleteStaff
);

staffRouter.patch(
  '/:id',
  authenticate,
  requireRole(['admin', 'teacher']),
  validate(idParamSchema, 'params'),
  validate(staffUpdateSchema),
  updateStaff
);



export default staffRouter;
