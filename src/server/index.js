const { verify } = require('jsonwebtoken');
const http = require('http');

const { buildClient, sendMessage } = require('../services/whatsapp');
const {
  constructResponse,
  ALLOWED_METHOD,
  BASE_ROUTE,
  SECRET,
  HOST,
} = require('../util');

async function buildServer(clientId = 'client-one') {
  const client = await buildClient(clientId);

  await client.initialize();

  const app = http.createServer((req, res) => {
    if (req.method !== ALLOWED_METHOD || !req.url.startsWith(BASE_ROUTE)) {
      res.statusCode = 405;
      return res.end('Only POST requests are allowed');
    }

    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);

    const token = searchParams.get('token');

    verify(token, SECRET, { complete: true }, async (error, { payload }) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      if (error) {
        return constructResponse(res, {
          statusMessage: false,
          error: 'Invalid token',
        });
      }
      const { phonenumber, message } = payload;

      const response = await sendMessage(phonenumber, message, client);

      return constructResponse(res, response);
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
