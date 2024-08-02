const fs = require("fs");
fs.writeFile("./goodbye_world.txt", "Goodbye", (err) => {
  if (err) throw err;
  console.log("fs.write on ./goodbye_world.txt");
});
