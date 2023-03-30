require('dotenv').config();

const BASE_ROUTE = '/api/v1/send?token=';
const SECRET = process.env.SECRET || 'segredo';
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';
const ALLOWED_METHOD = 'POST';

function constructResponse(res, body) {
  return res.end(JSON.stringify(body));
}

module.exports = {
  ALLOWED_METHOD,
  HOST,
  BASE_ROUTE,
  SECRET,
  constructResponse,
  PORT,
};
