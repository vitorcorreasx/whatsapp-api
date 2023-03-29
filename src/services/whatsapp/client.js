const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  })

    .on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    })
    .on('message_ack', async (message, ack) => {
      messages.set(message.id.id, ack);
    });

  await client.initialize();

  return {
    client,
    async sendMessage(receiverId, body) {
      const message = await client.sendMessage(receiverId, body);
      const messageId = message.id.id;

      let watchEvent;
      let timeoutEvent;

      return new Promise((resolve, reject) => {
        watchEvent = setInterval(() => {
          const statusMessage = messages.get(messageId);
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

/**
 *
 * @param {string} clientId
 * @returns {Promise<WhatsAppClient>}
 */
async function constructClient(clientId) {
  const messages = new Map();
  console.log('constructing client');

  const client = new Client({
    authStrategy: new LocalAuth({
      clientId,
    }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  })

    .on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    })
    .on('error', (err) => console.log({ err }))
    .on('ready', () => console.log('readyzim'))
    .on('message_ack', async (message, ack) => {
      messages.set(message.id.id, ack);
    });
  console.log(client);

  return {
    client,
    messages,
  };
}

module.exports = { buildClient, constructClient };
