const { buildClient } = require("./client");

const send = async (phone, body) => {
  const chatId = `${phone}@c.us`;
  const client = await buildClient();
  console.log("client builded");
  // return await client.sendMessage(chatId, body);
  // console.log("Status da Msg: ", { status });
  // return
  //   status,
  // };
};

module.exports = { send };
