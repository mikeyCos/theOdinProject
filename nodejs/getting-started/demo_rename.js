const fs = require("fs");

fs.rename("./hello_world.txt", "./hello.txt", (err) => {
  if (err) throw err;

  console.log("./hello_world.txt renamed to ./hello.txt");
});
