const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const authStrategy = new LocalAuth({ clientId: "client-one" });

const client = new Client({
  authStrategy,
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async ({ body, getContact }) => {
  console.log("Message received");
  const contact = await getContact();
  console.log({ message: body, from: contact.id.user });

  if (message.body === "!ping") {
    message.reply(
      `Mensagem recebida, uma equipe de macacos será destinada a responder a tua questã ...🚌`
    );
    client.send(
      `${message} é vitamina,\n Parando pra pensar, nem temos macacos pra isso. Pode ser um OompaLoompa?`
    );
  }
});

client.on("authenticated", (session) => {
  // console.log(client);
  sessionData = session;
  console.log(sessionData);
});

console.log(
  client.initialize()
    ? "Client initialized, wait for the QR Code"
    : "Fail to initialize"
);
