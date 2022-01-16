var amqp = require('amqplib')

let Channel = null

amqp
  .connect('amqp://localhost')
  .then(conn => {
    return conn.createChannel()
  })
  .then(channel => (Channel = channel))
  .catch(err => {
    console.error(err)
    process.exit(-1)
  })

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
