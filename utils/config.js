require('dotenv').config();

const {
  NODE_ENV, DB_HOST, PORT,
  SECRET,
} = process.env;

const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_DB_HOST = 'mongodb://localhost:27017/bitfilmsdb';
const DEV_PORT = 3000;

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production' && SECRET ? SECRET : DEV_SECRET;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
