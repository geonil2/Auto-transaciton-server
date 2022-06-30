import dotenv from 'dotenv';
dotenv.config();

const { HOST_PORT, DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, ACCESSKEYID, SECRETACCESSKEY, JWT_SECRETKEY, JWT_EXPIREINSEC } = process.env

export const config = {
  host: {
    port: HOST_PORT,
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
  },
  caver: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY,
  },
  jwt: {
    secretKey: JWT_SECRETKEY,
    expiresInSec: JWT_EXPIREINSEC,
  }
}
