require('dotenv').config();

const { verify, sign } = require('jsonwebtoken');
const http = require('http');

const { send } = require('./src/services/whatsapp');

const HOST = process.env.HOST || 'http://localhost';
const SECRET = process.env.PORT || 'secret';
const PORT = process.env.PORT || 3001;
const BASE_ROUTE = '/api/v1/send?token=';

async function sendResponse(res, error, decodedToken) {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (error) {
    return res.end(
      JSON.stringify({ statusMessage: false, error: 'Invalid token' })
    );
  }

  const { phonenumber, message } = decodedToken.payload;

  return res.end(JSON.stringify(await send(phonenumber, message)));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

  if (req.method !== 'POST' || !req.url.startsWith(BASE_ROUTE)) {
    res.statusCode = 405; // Status code for "Method Not Allowed"
    return res.end('Only POST requests are allowed');
  }

  verify(token, SECRET, { complete: true }, (error, decoded) =>
    sendResponse(res, error, decoded)
  );
});

server.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}/`);
});
