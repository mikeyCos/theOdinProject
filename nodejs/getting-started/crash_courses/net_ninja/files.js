import fs from "fs";

const lorem =
  "Nulla facilisi. Suspendisse lobortis metus sit amet cursus viverra. Duis vel mollis arcu. Mauris auctor risus quis elit venenatis, at tempor felis efficitur. Aenean ut sem luctus, sollicitudin sem in, porttitor est. In molestie odio vitae ex dapibus tempor. Donec a dictum quam. Proin iaculis enim sit amet rhoncus aliquam. Pellentesque accumsan nisi non augue convallis auctor. Morbi ultricies tortor nec aliquet maximus. Vestibulum ut dictum justo, eget vestibulum risus.";

// Reading files
/* fs.readFile("./docs/lorem.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("last line"); */

// Writing files
/* fs.writeFile("./docs/lorem.txt", "Hello world", (err, data) => {
  if (err) throw err;
  console.log("'Hello world' written in './docs/lorem.txt'");
});

fs.writeFile("./docs/lorem_plus.txt", lorem, (err, data) => {
  if (err) throw err;
  console.log(`'${lorem}' written in './docs/lorem_plus.txt'`);
}); */

// Directories
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) throw err;

    console.log("'/assets/' directory created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) throw err;

    console.log("'/assets/' directory deleted");
  });
}

// Delete files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) throw err;

    console.log("'deleteme.txt' file deleted");
  });
} else {
  fs.writeFile("./docs/deleteme.txt", "delete me", (err, data) => {
    if (err) throw err;

    console.log("'deleteme.txt' file created");
  });
}
