const { buildClient } = require('./client');

const SUFIX = 'c.us';

const send = async (phone, body) => {
  try {
    const client = await buildClient();
    return await client.sendMessage(`${phone}@${SUFIX}`, body);
  } catch (err) {
    new Error(err);
  }
};

module.exports = { send };
