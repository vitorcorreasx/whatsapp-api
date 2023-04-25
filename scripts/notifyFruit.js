const { sign } = require('jsonwebtoken');
const { request } = require('http');
const { URL } = require('url');
const { SECRET, HOST, ALLOWED_METHODS, PHONES } = require('../src/server/config');
const Holidays = require('date-holidays')

const phones = PHONES.split(",")

const hd = new Holidays()
hd.init('BR', 'RS')

const interns = {
  1: phones[0],
  2: phones[1],
  3: phones[2],
  4: phones[3],
  5: phones[4],
}

const getPersonDay = () => {
  const day = new Date().getDay()
  const isHd = hd.isHoliday(new Date())
  if(isHd){
    return
  }
  return interns[day]
}

function constructToken(message = 'Buscar Fruta!', phonenumber = getPersonDay()) {
  return sign({ message, phonenumber }, SECRET);
}

const token = constructToken();

const parsedUrl = new URL(HOST);

const [method] = ALLOWED_METHODS;

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  port: parsedUrl.port || 30005,
  host: parsedUrl.hostname,
  path: parsedUrl.pathname,
  method,
};

const req = request(options, (response) => {
  console.log(`statusCode: ${response.statusCode}`);

  response.on('data', (d) => {
    return process.stdout.write(d);
  });
});
req.write(JSON.stringify({ token }));

req.on('error', (error) => {
  console.error(error);
});

req.end();
