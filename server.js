const net = require("node:net");

const clients = [];

const server = net.createServer((socket) => {
  console.log("SERVER CREATED");
});

server.on("connection", (socket) => {
  console.log("SERVER: A new connection was established.");

  const clientId = clients.length + 1;

  console.log(`Client ${clientId} connected`);
  socket.write(`Id-${clientId}`);

  clients.forEach((client) => {
    client.socket.write(`New client with id ${clientId} was connected`);
  });

  socket.on("data", (data) => {
    clients.forEach((client) => {
      client.socket.write(`${data}`);
    });
  });

  clients.push({ id: clientId, socket });

  socket.on("error", (err) => {
    console.log("SERVER - ERROR: ", err.message);
    console.log("---------------------------------------");
  });
});

server.listen(3001, "127.0.0.1", () => {
  console.log("Server is running ", server.address());
});
