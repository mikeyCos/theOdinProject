import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";

console.log(uuidv4());

/* const Logger = () => {
  const log = (msg) => {
    // call event
    this.emit("message", { id: uuidv4(), msg });
  };

  return { ...EventEmitter(), log };
}; */

class Logger extends EventEmitter {
  log = (msg) => {
    // call event
    this.emit("message", { id: uuidv4(), msg });
  };
}

const logger_0 = new Logger();
logger_0.on("message", (data) => console.log("Called event listener:", data));
logger_0.log("hello world :)");

export default Logger;
