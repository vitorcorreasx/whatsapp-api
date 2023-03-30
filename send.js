const http = require('http');

const { sign } = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'segredo';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6NTU5OTY5MjkwNDIsIm1lc3NhZ2UiOiJCb20gZGlhIiwiaWF0IjoxNjc5MDcyMzg2fQ.eJ5yfLepIFTpf_ziAGkK3e_Kv2xeLhhnyVza5tAXm4o';

function constructToken(message = 'aoba', phonenumber = 5555996929042) {
  return sign({ message, phonenumber }, SECRET);
}
const port = process.env.PORT || 3001;
const options = {
  hostname: 'localhost',
  port,
  path: `/api/v1/send?token=${constructToken()}`,
  method: 'POST',
};

// console.log(options);

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    return process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
