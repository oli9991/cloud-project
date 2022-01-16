require("dotenv").config();

var amqp = require("amqplib/callback_api");

const { ExecuteQuery } = require("./database");

const QUEUE = "appointments";
var CONNECTED = false;
var time = 0;

console.log(CONNECTED);
while (!CONNECTED) {
  if (time === 1) {
    amqp.connect("amqp://localhost", (error0, connection) => {
      console.log("connected");
      CONNECTED = true;
      if (error0) {
        console.log("Failed to connect in procesator");
      } else {
        CONNECTED = true;
        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }

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
        });
      }
    });
  }
  time = 1;
}
