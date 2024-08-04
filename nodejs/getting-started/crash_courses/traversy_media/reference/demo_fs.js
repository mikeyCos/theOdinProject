import fs from "fs";
import path from "path";

const { dirname, filename } = import.meta;

// mkdir
// fs.mkdir(path.join(dirname, "/pizzas"), (err) => {
//   if (err) throw err;
//   console.log("/pizzas folder created");
// });

// writeFile
fs.writeFile(
  path.join(dirname, "/pizzas", "pepperoni.txt"),
  "Yummy, pepperoni pizza!",
  (err) => {
    if (err) throw err;
    console.log("pepperoni.txt created");

    // append
    fs.appendFile(
      path.join(dirname, "/pizzas", "pepperoni.txt"),
      " Cowabunga!",
      (err) => {
        if (err) throw err;
        console.log("Appended ' Cowabunga!' text in 'pepperoni.txt''");
      }
    );
  }
);

// readFile
fs.readFile(
  // Note, appendFile is in queue (?)
  path.join(dirname, "/pizzas", "pepperoni.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log("data:", data);
  }
);

// rename
fs.rename(
  path.join(dirname, "/pizzas", "pepperoni.txt"),
  path.join(dirname, "/pizzas", "pepperoni_lg.txt"),
  (err) => {
    if (err) throw err;
    console.log(
      "Renamed '/pizzas/pepperoni.txt'  to '/pizzas/pepperoni-lg.txt'"
    );
  }
);
