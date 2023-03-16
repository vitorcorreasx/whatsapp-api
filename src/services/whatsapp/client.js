const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const MESSAGE_DEFAULT = {
  ping: 'pong',
  test: 'resposta automática utilizando whatsApp-web.js',
};

const MESSAGE_ACK = {
  ERROR: -1,
  VALID: 0,
};

const TIME_HELPER = {
  TEN_SECONDS: 10000,
  HUNDRED_MILISEC: 100,
};

/**
 *
 * @returns {Promise<WhatsAppClient>}
 */
async function buildClient() {
  const messages = new Map();

  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: 'client-one',
    }),
  })
    .on('authenticated', () => {
      console.log("You're authenticated");
    })
    .on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    })
    .on('ready', () => {
      console.log('Ready');
    })
    .on('message', async (message) => {
      console.log('Message Received!', {
        message: message.body,
      });
      const reply = MESSAGE_DEFAULT[message.body];
      if (reply) {
        message.reply(reply);
      }
    })
    .on('message_ack', async (message, ack) => {
      messages.set(message.id.id, ack);
    });

  await client.initialize();

  return {
    async sendMessage(receiverId, body) {
      const message = await client.sendMessage(receiverId, body);
      const messageId = message.id.id;

      let watchEvent;
      let timeoutEvent;

      console.log(receiverId, 'Client message obj', message);
      return new Promise((resolve, reject) => {
        watchEvent = setInterval(() => {
          const statusMessage = messages.get(messageId);
          console.log(receiverId, statusMessage);
          if (statusMessage > MESSAGE_ACK.VALID) {
            resolve({ statusMessage });
          }
          if (statusMessage === MESSAGE_ACK.ERROR) {
            reject(new Error('Failed to send message'));
          }
        }, TIME_HELPER.HUNDRED_MILISEC);

        timeoutEvent = setTimeout(() => {
          reject(new Error('WhatsApp message timeout reached'));
        }, TIME_HELPER.TEN_SECONDS);
      }).finally(() => {
        clearInterval(watchEvent);
        clearTimeout(timeoutEvent);
        messages.delete(messageId);
      });
    },
  };
}

module.exports = { buildClient };
