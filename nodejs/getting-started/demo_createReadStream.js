const events = require("events");
const eventEmitter = new events.EventEmitter();
const fs = require("fs");
const readStream = fs.createReadStream("./hello_world.txt");
const fileOpenHandler = () => {
  console.log("The file, ./hello_world.txt, is open!");
};

readStream.on("open", fileOpenHandler);
eventEmitter.on("open", fileOpenHandler);
eventEmitter.emit("open");
