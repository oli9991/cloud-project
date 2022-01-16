require("dotenv").config();

const amqp = require("amqplib");

const { ExecuteQuery } = require("./database");

const QUEUE = "appointments";

const reconnectToBroker = () => {
  console.error("[AMQP] reconnecting");
  connectToBroker();
}

const connectToBroker = () => {
  console.log(`${process.env.AMQPURL}`)
  amqp.connect(`${process.env.AMQPURL}`).then(
    async function(conn) {
      conn.on("error", function(err) {
        if (err.message !== "Connection closing") {
          console.error("[AMQP] connection error", err.message);
        }
      });
      
      conn.on("close", function() {
        console.error("Connection closed. Reconnecting in 15s!");
        return setTimeout(reconnectToBroker, 15000);
      });

      const ch = await conn.createChannel();
      const eventQueue = await ch.assertQueue(QUEUE, { durable: true });
      
      await ch.consume(eventQueue.queue, handleEvent(ch), { noAck: false });

      console.log("Broker connection and subscriptions are established!");
    }).catch(ex => {
      console.error("Couldn't connect to message queue!");
      console.error(ex);
      console.error("Reconnecting in 5s!");

      return setTimeout(reconnectToBroker, 5000);
    });
};

const handleEvent = async (channel) => {
  return async (msg) => {
    console.log(" [x] Received %s", msg.content.toString());

    if (msg !== null) {
      const jsonPayload = JSON.parse(msg.content);
      try {
        await ExecuteQuery(
          "INSERT INTO appoinments (full_name, time_interval, service_id) VALUES ($1, $2, $3)",
          [
            jsonPayload.full_name,
            jsonPayload.time_interval,
            jsonPayload.service_id,
          ]
        );
      } catch (err) {
        console.error(err);
      }
    }

    channel.ack(msg);
  }
}

connectToBroker();
