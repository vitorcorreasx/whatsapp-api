const { buildClient } = require("./client");

const send = async (phone, body) => {
  const receiverId = `${phone}@c.us`;
  console.log(`Client builded. Trying to send "${body}" to "${receiverId}"`);
  const client = await buildClient();
  return await client.sendMessage(receiverId, body);
};

module.exports = { send };
