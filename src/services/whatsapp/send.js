const { buildClient } = require('./client');

const SUFIX = 'c.us';

const send = async (phone, body, client) => {
  try {
    console.log('trying to send');
    const response = await client.sendMessage(`${phone}@${SUFIX}`, body);
    // console.log('After send...', { response });
    return response;
  } catch (err) {
    console.error('Error trying to send message', { err });
    new Error(err);
  }
};

module.exports = { send };
