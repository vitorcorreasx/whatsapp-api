async function sendMessage(phonenumber, message, client) {
  try {
    const receiverNumber = `${phonenumber}@c.us`;

    const { ack } = await client.sendMessage(receiverNumber, message);

    return {
      statusMessage: ack,
    };
  } catch (err) {
    console.error('Error trying to send message', { err });
    new Error(err);
  }
}

module.exports = { sendMessage };
