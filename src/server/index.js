const { verify } = require('jsonwebtoken');
const http = require('http');

const { buildClient } = require('../services/whatsapp');
const {
  constructResponse,
  ALLOWED_METHOD,
  BASE_ROUTE,
  SECRET,
  HOST,
} = require('../util');

async function buildServer(clientId = 'client-one') {
  const { sendMessage } = await buildClient(clientId);

  const app = http.createServer((req, res) => {
    if (req.method !== ALLOWED_METHOD || !req.url.startsWith(BASE_ROUTE)) {
      res.statusCode = 405;
      return constructResponse(res, {
        message: 'Only POST requests are allowed',
      });
    }
    req.on('data', (data) => {
      const { token } = JSON.parse(data.toString());
      verify(token, SECRET, { complete: true }, async (error, decoded) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (error) {
          return constructResponse(res, {
            statusText: -1,
            error: 'Invalid token',
          });
        }

        const { phonenumber = null, message = null } = decoded?.payload;

        if (!phonenumber || !message) {
          return constructResponse(res, {
            statusText: -1,
            error: 'Payload not found',
          });
        }

        const response = await sendMessage(phonenumber, message);

        return constructResponse(res, response);
      });
    });
  });

  return {
    /**
     * Define qual porta o servidor vai receber requisições
     * @param {number} port
     */
    listen: (port) => {
      app.listen(port);
      console.log(`Server running at ${HOST}:${port}/`);
    },
  };
}

module.exports = { buildServer };
