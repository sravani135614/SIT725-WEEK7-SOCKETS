const net = require("net");
const readline = require("readline");

const PORT = 65432;
const HOST = "127.0.0.1";

// Create socket connection
const client = new net.Socket();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to server
client.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);
});

// Receive data from server
client.on("data", (data) => {
  console.log(data.toString());
});

// Handle input from user
rl.on("line", (input) => {
  client.write(input);

  if (input.toLowerCase() === "exit") {
    rl.close();
    client.end();
  }
});

// Handle server disconnect
client.on("close", () => {
  console.log("Disconnected from server.");
  process.exit(0);
});
