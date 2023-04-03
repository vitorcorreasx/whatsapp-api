require('dotenv').config();

const BASE_ROUTE = '/api/v1/send';
const SECRET = process.env.SECRET || 'segredo';
const HOST = 'http://localhost:3001/api/v1/send';
const ALLOWED_METHOD = 'POST';

function constructResponse(res, body) {
  return res.end(JSON.stringify(body));
}

module.exports = {
  constructResponse,
  ALLOWED_METHOD,
  BASE_ROUTE,
  SECRET,
  HOST,
};
