const server = require("http");
const url = require("url");
const fs = require("fs");

server
  .createServer((req, res) => {
    console.log(req.url);
    const query = url.parse(req.url, true);
    console.log(query);
    const filename = `./${query.pathname}.html`;
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
