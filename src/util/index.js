const BASE_ROUTE = '/api/v1/send?token=';
const SECRET = process.env.SECRET || 'segredo';
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
};
