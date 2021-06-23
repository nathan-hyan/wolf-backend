/* eslint-disable radix */
import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT || '1337');
const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

export const CONFIG = {
  server: SERVER,
};

export default CONFIG;
