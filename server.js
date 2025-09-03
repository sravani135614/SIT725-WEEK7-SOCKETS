const net = require("net");

const PORT = 65432;
const HOST = "127.0.0.1";

let clients = [];
let server;

function startServer(callback) {
  server = net.createServer((socket) => {
    clients.push(socket);

    socket.on("data", (data) => {
      const message = data.toString().trim();
      clients.forEach((client) => {
        if (client !== socket) {
          client.write(message);
        }
      });
    });

    socket.on("end", () => {
      clients = clients.filter((c) => c !== socket);
    });
  });

  server.listen(PORT, HOST, callback);
}

function stopServer(callback) {
  clients.forEach((c) => c.end());
  server.close(callback);
}

module.exports = { startServer, stopServer, PORT, HOST };
