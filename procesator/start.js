require("dotenv").config();

const amqp = require("amqplib");

const { ExecuteQuery } = require("./database");

const QUEUE = "appointments";

const init = async () => {
  while (true) {
    try {
      const connection = await amqp.connect(
        process.env.NODE_ENV === "development"
          ? "amqp://localhost"
          : process.env.AMQPURL
      );
      const channel = await connection.createChannel();
      channel.assertQueue(QUEUE, {
        durable: false,
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        QUEUE
      );

      channel.consume(QUEUE, async (msg) => {
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
      });

      break;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
init();
