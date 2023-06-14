const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("WebSocket connection established.");

  // Function to send multiples of the current number every 2 seconds
  function sendMultiples(num) {
    currentNumber = Number(num) - 1;

    currentNumber++;
    const multiples = Array.from(
      { length: 10 },
      (_, index) => currentNumber * (index + 1)
    );

    multiples.forEach((multiple, index) => {
      setTimeout(() => {
        ws.send(
          "Multiple " + (index + 1) + " of " + currentNumber + ": " + multiple
        );
      }, (index + 1) * 2000);
    });
  }

  // Event handler for receiving messages from the client
  ws.on("message", function incoming(message) {
    console.log("Received message from client: " + message);
    // Process the received message here
    sendMultiples(message);
    // If the client wants multiples of the next number
  });

  // Event handler for when the connection is closed
  ws.on("close", function close() {
    console.log("WebSocket connection closed.");
  });

  // Start sending multiples when the connection is established
});
