import express from 'express';

import { getUser, login, logout, refreshToken } from '../../controllers/authController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/zodValidatorsMiddleware.js';
import { zodLoginSchema } from '../../validators/zodLoginSchema.js';

const authRouter = express.Router();

authRouter.post('/login', validate(zodLoginSchema), login);
authRouter.post('/logout', authenticate, logout);
authRouter.post('/refresh-token',refreshToken)
authRouter.get('/me',authenticate,getUser)

export default authRouter;
