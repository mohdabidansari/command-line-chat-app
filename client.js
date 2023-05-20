const net = require("net");
const readLine = require("node:readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const question = (ques) => {
  return new Promise((resolve, reject) => {
    rl.question(ques, (message) => {
      resolve(message);
    });
  });
};

const ask = async (socket) => {
  const message = await question("Client messsage > ");
  socket.write(message);
};

const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 3001,
  },
  async () => {
    console.log("CLIENT: Connection made to server");

    // rl.question("Enter message -> ", (message) => {
    //   process.stdout.moveCursor(0, -1, () => {
    //     process.stdout.clearLine();
    //   });
    //   socket.write(message);
    // });

    await ask(socket);
    await moveCursor(0, -1);
    await clearLine(0);
  }
);

socket.on("data", async (data) => {
  // console.log();
  // process.stdout.moveCursor(0, -1, () => {
  //   process.stdout.clearLine();
  //   console.log(data.toString("utf-8"));

  //   rl.question("Enter message -> ", (message) => {
  //     process.stdout.moveCursor(0, -1, () => {
  //       process.stdout.clearLine();
  //     });
  //     socket.write(message);
  //   });
  // });
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);

  console.log(data.toString("utf-8"));
  await ask(socket);
  await moveCursor(0, -1);
  await clearLine(0);
});

socket.on("close", () => {
  console.log("Closed!");
});

socket.on("end", () => {
  console.log("Ended!");
});

socket.on("error", (err) => {
  console.log("Closed!");
  console.log(err.message);
  rl.close();
  // socket.destroy();
});
