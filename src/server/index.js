const { verify } = require('jsonwebtoken');
const http = require('http');

const { constructClient } = require('../services/whatsapp');
const { send } = require('../services/whatsapp');

const BASE_ROUTE = '/api/v1/send?token=';
const SECRET = process.env.SECRET || 'segredo';
const HOST = process.env.HOST || 'http://localhost';

async function sendResponse(res, error, decodedToken, client) {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (error) {
    return res.end(
      JSON.stringify({ statusMessage: false, error: 'Invalid token' })
    );
  }

  const { phonenumber, message } = decodedToken.payload;

  return res.end(JSON.stringify(await send(phonenumber, message, client)));
}

async function buildServer() {
  const service = await constructClient('client-one');
  const client = service.client.initialize();
  const app = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (req.method !== 'POST' || !req.url.startsWith(BASE_ROUTE)) {
      res.statusCode = 405; // Status code for "Method Not Allowed"
      return res.end('Only POST requests are allowed');
    }

    verify(token, SECRET, { complete: true }, (error, decoded) => {
      console.log(client);
      sendResponse(res, error, decoded, client);
    });
  });

  return {
    /**
     *
     * @param {number} port
     */
    listen: (port) => {
      app.listen(port);
      console.log(`Server running at ${HOST}:${port}/`);
    },
  };
}

module.exports = { buildServer };
