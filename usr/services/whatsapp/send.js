const { buildClient } = require("./client");

const send = async (phone, body) => {
  const client = await buildClient();
  const receiverId = `${phone}@c.us`;
  console.log(client);

  client.sendMessage(receiverId, body);
};

module.exports = { send };
