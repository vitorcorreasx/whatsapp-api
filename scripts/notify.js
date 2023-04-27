const { sign } = require('jsonwebtoken');
const { request } = require('http');
const { URL } = require('url');
const { SECRET, HOST, ALLOWED_METHODS} = require('../src/server/config');
const Holidays = require('date-holidays');

const {phones} = require('../db.json');

const holiday = new Holidays();
holiday.init('BR', 'RS');

const getPersonDay = () => {
  const day = new Date().getDay();
  if( holiday.isHoliday(new Date()) ){
    return;
  };
  return phones[day-1];
};

function constructToken(message = 'Buscar Fruta!', phonenumber = getPersonDay()) {
  return sign({ message, phonenumber }, SECRET);
};

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
