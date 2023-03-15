const { send } = require("./usr/services/whatsapp");

async function toSend() {
  await send("555584241789", "No index");
}

toSend();
