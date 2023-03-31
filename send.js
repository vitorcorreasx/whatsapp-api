const http = require('http');

const { sign } = require('jsonwebtoken');

const {
  ALLOWED_METHOD,
  BASE_ROUTE,
  SECRET,
  PORT,
  HOST,
} = require('./src/util');

function constructToken(message = 'Hello World', phonenumber = 5555999999999) {
  return sign({ message, phonenumber }, SECRET);
}

const token = constructToken();

const options = {
  path: BASE_ROUTE,
  method: ALLOWED_METHOD,
  hostname: HOST.replace('http://', ''),
  port: PORT,
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
