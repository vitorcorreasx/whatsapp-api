const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

// Who should be notified when server is back online
const receivers = [];

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
});

client
  .on("authenticated", (session) => {
    console.log("You're authenticated");
  })
  .on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  })
  .on("ready", async () => {
    console.log("Ready");

    receivers.map((value) => {
      console.log(`Message has been sent to -> ${value}`);
      client.sendMessage(`${value}@c.us`, "Server is back online");
    });
  })
  .on("message", async (message) => {
    console.log("Message Received!", {
      message: message.body,
      from: message_data.notifyName,
    });
    if (message.body === "ping") message.reply("pong");
  })
  .initialize();
