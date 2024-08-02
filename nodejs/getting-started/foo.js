const myURL = new URL("https://example.org:8888");
console.log(myURL.port);

myURL.port = 1234.5678;
console.log(myURL.port);

myURL.port = 1e10;

console.log(myURL.port);

const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();

eventEmitter.on("start", (name) => {
  console.log(`hi, ${name}! :)`);
});

eventEmitter.emit("start", "Bob");

const { createServer } = require("node:http");
var dt = require("./myfirstmodule");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello World, ${dt.myDateTime()}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
