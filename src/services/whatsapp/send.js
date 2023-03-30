async function sendMessage(phonenumber, message, client) {
  try {
    const receiverNumber = parseNumber(phonenumber);
    console.log(receiverNumber);

    const { ack } = await client.sendMessage(receiverNumber, message);

    return {
      statusMessage: ack,
    };
  } catch (err) {
    console.error('Error trying to send message', { err });
    new Error(err);
  }
}

function parseNumber(number) {
  return `${number}`.replace('+', '') + '@c.us';
}

module.exports = { sendMessage };
