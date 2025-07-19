import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import {
  getAuthByIdService,
  LoginService,
  logoutService,
  refreshTokenService
} from '../services/authService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';

export const login = async (req, res, next) => {
  try {
    const { refreshToken, ...data } = await LoginService(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: configs.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    });

    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse(StatusCodes.OK, 'Login successful', data));
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies['refreshToken'];


    const isRefreshTokenRemove = await logoutService(token);

    if (!isRefreshTokenRemove) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'ERR_INTERNAL_SERVER_ERROR',
        'Something went wrong try again'
      );
    }

    res.clearCookie('refreshToken');

    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse(StatusCodes.OK, 'Successfully Logout'));
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies['refreshToken'];

    const { refreshToken, accessToken } = await refreshTokenService(token);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: configs.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 3,
      path: '/'
    });

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Token refresh successfully', {
        token: accessToken
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { authId } = req.user;

    const data = await getAuthByIdService(authId, {
      select: 'username role linkedId'
    });

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'User data fetched successfully', {
        username: data.username,
        role: data.role,
        userId: data.linkedId,
        authId: data._id
      })
    );
  } catch (error) {
    next(error);
  }
};
