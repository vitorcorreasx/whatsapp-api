const http = require('http');
const { verify } = require('jsonwebtoken');

require('dotenv').config();

const { send } = require('./src/services/whatsapp');

const HOST = process.env.HOST || 'http://localhost';
const SECRET = process.env.PORT || 'secret';
const PORT = process.env.PORT || 3001;

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

// Create a server object
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const token = url.searchParams.get('token');

  verify(token, SECRET, { complete: true }, (error, decoded) =>
    sendResponse(res, error, decoded)
  );
});

// Listen for incoming requests
server.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}/`);
});
