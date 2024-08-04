import http from "http";
import fs from "fs";
import _ from "lodash";

http
  .createServer((req, res) => {
    // Lodash
    const num = _.random(0, 10);
    console.log(num);

    const greet = _.once(() => {
      console.log("hello");
    });

    greet();
    greet();

    // console.log("Request made");
    // console.log(req.url, req.method);

    // Set header content type
    res.setHeader("Content-Type", "text/html");

    let path = "./views/";

    switch (req.url) {
      case "/":
        path += "index.html";
        res.statusCode = 200;
        break;
      case "/about":
        path += "about.html";
        res.statusCode = 200;
        break;
      case "/about-me":
        res.statusCode = 301;
        res.setHeader("Location", "/about");
        res.end();
        break;
      default:
        path += "404.html";
        res.statusCode = 404;
        break;
    }

    // Send an html file
    fs.readFile(path, (err, content) => {
      if (err) throw err;

      // res.write(content);
      // res.end();
      // OR pass content into end method
      res.end(content);
    });
  })
  .listen(3000, "localhost", () => {
    console.log("Listening for requests on port 3000");
  });
