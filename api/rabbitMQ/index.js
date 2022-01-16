var amqp = require('amqplib')

let Channel = null

const init = async () => {
  while (true) {
    try {
      const connection = await amqp.connect(
        process.env.NODE_ENV === "development"
        ? "amqp://localhost"
        : process.env.AMQPURL
      );
      Channel = await connection.createChannel();
      break;
    }
    catch (err) {
      console.log(err);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
init()

const PublishMessageAsync = async (queue, payload) => {
  await Channel.assertQueue(queue, {
    durable: false
  })

  const stringifiedPayload = JSON.stringify(payload)

  Channel.sendToQueue(queue, Buffer.from(stringifiedPayload))
  console.info(`Sent ${stringifiedPayload} to queue ${queue}`)
}

module.exports = {
  PublishMessageAsync
}
