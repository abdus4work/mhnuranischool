import jwt from 'jsonwebtoken';

import configs from '../../configs/serverConfig.js';


export const generateAccessToken = async (payload) => {
  return jwt.sign(payload, configs.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRES_IN
  });
};

export const generateRefreshToken = async (payload) => {
  return jwt.sign(payload, configs.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: configs.JWT_REFRESH_TOKEN_EXPIRES_IN
  });
};


export const verifyAccessToken = async(token)=>{
  return jwt.verify(token,configs.JWT_ACCESS_TOKEN_SECRET);
}

export const verifyRefreshToken = async(token)=>{
  return jwt.verify(token,configs.JWT_REFRESH_TOKEN_SECRET) ;
}