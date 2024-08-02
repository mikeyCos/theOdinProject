const fs = require("fs");

fs.open("./hello_world.txt", "a", (err, file) => {
  if (err) throw err;
  console.log(file);
  console.log("hello_world.txt is open!");
});
