const { send } = require("./usr/services/whatsapp");

async function toSend() {
  console.log("before send");
  console.log(await send("555584241789", "Nova mensagem"));
  console.log("after send");
}

toSend();
