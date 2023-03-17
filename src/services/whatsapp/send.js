const { buildClient } = require('./client');

const send = async (phone, body) => {
  const client = await buildClient();
  const receiverId = `${phone}@c.us`;
  try {
    return await client.sendMessage(receiverId, body);
  } catch (err) {
    new Error(err);
  }
};

module.exports = { send };
