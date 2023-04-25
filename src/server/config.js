require('dotenv').config();

const HOST = 'http://localhost:30005/api/v1/send';
const SECRET = process.env.SECRET || 'segredo';
const BASE_ROUTE = '/api/v1/send';
const ALLOWED_METHODS = ['POST'];
const {PHONES} = process.env

const HTTP_STATUS = {
  METHOD_NOT_ALLOWED: 405,
  NOT_FOUND: 404,
  OK: 200,
};
module.exports = {
  ALLOWED_METHODS,
  HTTP_STATUS,
  BASE_ROUTE,
  SECRET,
  HOST,
  PHONES
};
