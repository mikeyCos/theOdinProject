const fs = require("fs");

fs.unlink("./hello_world.txt", (err) => {
  if (err) throw err;
  console.log("./hello_world.txt deleted");
});
