const net = require("net");
const readLine = require("node:readline");

let id;

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
  const message = await question(
    "\x1b[31m" + "Enter your message > " + "\x1b[0m"
  );
  socket.write(`Client ${id}: ${message}`);
};

const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 3001,
  },
  async () => {
    console.log("\x1b[32m", "CLIENT: Connection made to server", "\x1b[0m");
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

  if (data.toString("utf-8").substring(0, 2) === "Id") {
    id = data.toString("utf-8").substring(3);
    console.log("\x1b[34m", `Your client id is ${id}`, "\x1b[0m");
  } else if (data.toString("utf-8").substring(0, 3) === "New") {
    console.log("\x1b[34m", data.toString("utf-8"), "\x1b[0m");
  } else {
    console.log(data.toString("utf-8"));
  }

  await ask(socket);
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
