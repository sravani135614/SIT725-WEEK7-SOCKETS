const net = require("net");
const { startServer, stopServer, PORT, HOST } = require("./server");

describe("Socket Server Tests", () => {
  beforeAll((done) => {
    startServer(done);
  });

  afterAll((done) => {
    stopServer(done);
  });

  test("Client can connect to server", (done) => {
    const client = new net.Socket();
    client.connect(PORT, HOST, () => {
      expect(client.remoteAddress).toBeDefined();
      client.end();
      done();
    });
  });

  test("Message is broadcast between clients", (done) => {
    const client1 = new net.Socket();
    const client2 = new net.Socket();

    client1.connect(PORT, HOST, () => {
      client2.connect(PORT, HOST, () => {
        client2.on("data", (data) => {
          expect(data.toString()).toBe("Hello from client1");
          client1.end();
          client2.end();
          done();
        });

        // Client1 sends a message
        client1.write("Hello from client1");
      });
    });
  });
});
