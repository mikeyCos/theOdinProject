import http from "http";
import path from "path";
import url from "url";
import fs, { readFile } from "fs";

const { dirname, filename } = import.meta;
/* import Animal from "./animal.js";
import Logger from "./logger.js";

console.log("hello from NodeJS");

const animal_1 = Animal("cat", "Norm");
animal_1.greet();

const logger_0 = new Logger();
logger_0.on("message", (data) => console.log("Called event listener:", data));
logger_0.log("hello world :)");
 */

const server = http.createServer((req, res) => {
  /* console.log(req.url);
  if (req.url === "/") {
    fs.readFile(path.join(dirname, "public", "index.html"), (err, content) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  }

  if (req.url === "/api/users") {
    const users = [
      { name: "Victor Tsoi", age: 30 },
      { name: "Danny Way", age: 45 },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } */

  const filepath = path.join(
    dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  const extname = path.extname(filepath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Page not found
        fs.readFile(path.join("./public", "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port: ${port}`));
