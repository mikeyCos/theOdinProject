import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filename = path.basename(__filename);

console.log(__dirname);
console.log(__filename);
