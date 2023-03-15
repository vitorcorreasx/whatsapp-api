const { send } = require("./usr/services/whatsapp");

async function toSend() {
  await send("555511111111", "Hello World ✌🏻");
}

toSend();
