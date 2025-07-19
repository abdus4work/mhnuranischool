import dotenv from 'dotenv';
dotenv.config();

const configs = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  get DB_URL() {
    return this.NODE_ENV === 'development'
      ? process.env.DEV_DB_URL
      : process.env.PROD_DB_URL;
  },
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_FULL_NAME: process.env.ADMIN_FULL_NAME,
  ADMIN_CONTACT: process.env.ADMIN_CONTACT,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
  ADMIN_DATE_OF_JOINING: process.env.ADMIN_DATE_OF_JOINING
};
export default configs;
