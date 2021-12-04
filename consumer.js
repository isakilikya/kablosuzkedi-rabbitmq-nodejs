const amqp = require("amqplib");

const message = {
  description: "Bu bir test mesajidir...",
};

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    // We define which job does this channel belong to...
    const assertion = channel.assertQueue("jobsQueue");

    // Getting the message...
    channel.consume("jobsQueue", (message) => {
      console.log("Message: ", message.content.toString());
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error", error);
  }
}
