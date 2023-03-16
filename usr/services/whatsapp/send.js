const { buildClient } = require("./client");

const send = async (phone, body) => {
  const client = await buildClient();
  console.log("The client has been created");
  const receiverId = `${phone}@c.us`;

  console.log("Sending message to", receiverId);
  try {
    const message = await client.sendMessage(receiverId, body);
    console.log(receiverId, "message", message);
  } catch (err) {
    console.log(receiverId, err);
  }
};

module.exports = { send };
