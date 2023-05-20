const net = require("node:net");

const clients = [];

const server = net.createServer((socket) => {
  console.log("SERVER CREATED");
});

server.on("connection", (socket) => {
  console.log("SERVER: A new connection was established.");

  // clients.forEach((s) => {
  //   s.on("data", (data) => {
  //     s.write(data);
  //   });
  // });

  socket.on("data", (data) => {
    clients.forEach((s) => {
      s.write(data);
    });
  });

  clients.push(socket);

  socket.on("error", (err) => {
    console.log("SERVER - ERROR: ", err.message);
    console.log("---------------------------------------");
  });
});

server.listen(3001, "127.0.0.1", () => {
  console.log("Server is running ", server.address());
});
