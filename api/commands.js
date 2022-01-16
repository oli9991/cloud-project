const MessageQueue = require('./rabbitMQ')

const QUEUE = 'appointments'

const HandleAsync = async appointment => {
  await MessageQueue.PublishMessageAsync(QUEUE, appointment)
}

module.exports = {
  HandleAsync
}
