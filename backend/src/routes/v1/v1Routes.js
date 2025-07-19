import express from 'express';
import { StatusCodes } from 'http-status-codes';

import SuccessResponse from '../../utils/common/successResponse.js';
import authRouter from './authRoutes.js';
import feesRouter from './feesRoute.js';
import salaryRouter from './salaryRoutes.js';
import staffRouter from './staffRoutes.js';
import studentRouter from './studentRoutes.js';
import transactionRouter from './transactionRoutes.js';

const v1Router = express.Router();

v1Router.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json(new SuccessResponse(200, 'Pong', {}));
});
v1Router.use('/students', studentRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/staffs', staffRouter);
v1Router.use('/fees', feesRouter);
v1Router.use('/transactions', transactionRouter);
v1Router.use('/salary', salaryRouter);
export default v1Router;
