require('dotenv').config();

const BASE_ROUTE = '/api/v1/send';
const SECRET =
  process.env.SECRET ||
  'bb93b0913a343266c3b44f211a323f5bd7eb2512781165dc26dadbc9fdb09728';
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
