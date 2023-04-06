import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  env: process.env.NODE_ENV || 'development'
};

export default config;
