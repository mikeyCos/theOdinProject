const fs = require("fs");

fs.appendFile("./hello_world.txt", "hello world! :)", (err) => {
  if (err) throw err;
  console.log("hello_world.txt saved!");
});
