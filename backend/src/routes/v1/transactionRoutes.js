import express from 'express';

import { createTransaction, getAllTransaction, getTransaction } from '../../controllers/transactionController.js';
import { authenticate, requireRole } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import { transactionSchema } from '../../validators/paymentSchema.js';

const transactionRouter = express.Router();

transactionRouter.use(authenticate);
transactionRouter.post(
  '/',
  requireRole(['admin']),
  validate(transactionSchema),
  createTransaction
);

transactionRouter.get(
  '/',
  requireRole(['admin']),
  getAllTransaction
)

transactionRouter.get(
  '/:paymentId',
  requireRole(['admin']),
  getTransaction
)


export default transactionRouter;
