const http = require('http');
const { URL } = require('url');

const { sign } = require('jsonwebtoken');

const { ALLOWED_METHOD, SECRET, HOST } = require('./src/util');

function constructToken(message = 'Hello World', phonenumber = 5555999999999) {
  return sign({ message, phonenumber }, SECRET);
}

const token = constructToken();

const parsedUrl = new URL(HOST);

const options = {
  host: parsedUrl.hostname,
  port: parsedUrl.port || 3001,
  path: parsedUrl.pathname,
  method: ALLOWED_METHOD,
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    return process.stdout.write(d);
  });
});
req.write(JSON.stringify({ token }));

req.on('error', (error) => {
  console.error(error);
});

req.end();
