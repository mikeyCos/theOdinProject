import fs from "fs";

const readStreamer = fs.createReadStream("./docs/lorem_huge.txt", "utf-8");
const writeStreamer = fs.createWriteStream("./docs/lorem_things.txt");

/* readStreamer.on("data", (chunk) => {
  console.log("------ NEW CHUNK ------");
  console.log(chunk);

  writeStreamer.write("\nNEW CHUNK\n");
  writeStreamer.write(chunk);
}); */

// Piping
readStreamer.pipe(writeStreamer);
