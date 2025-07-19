import express from 'express';

import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent
} from '../../controllers/studentController.js';
import { authenticate, requireRole } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import idParamSchema from '../../validators/idParamSchema.js';
import { zodStudentQuerySchema } from '../../validators/zodStudentQuerySchema.js';
import {
  zodStudentCreateSchema,
  zodStudentUpdateSchema
} from '../../validators/zodStudentSchema.js';

const studentRouter = express.Router();

studentRouter.patch(
  '/:id',
  authenticate,
  requireRole(['admin']),
  validate(idParamSchema, 'params'),
  validate(zodStudentUpdateSchema),
  updateStudent
);
studentRouter.delete(
  '/:id',
  authenticate,
  requireRole(['admin']),
  validate(idParamSchema, 'params'),
  deleteStudent
);
studentRouter.get(
  '/',
  authenticate,
  requireRole(['admin']),
  validate(zodStudentQuerySchema, 'query'),
  getStudents
);
studentRouter.post(
  '/',
  authenticate,
  requireRole(['admin']),
  validate(zodStudentCreateSchema),
  createStudent
);

export default studentRouter;
