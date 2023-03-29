const { buildClient } = require('./client');

const SUFIX = 'c.us';

const send = async (phone, body, client) => {
  try {
    return await client.sendMessage(`${phone}@${SUFIX}`, body);
  } catch (err) {
    new Error(err);
  }
};

module.exports = { send };
