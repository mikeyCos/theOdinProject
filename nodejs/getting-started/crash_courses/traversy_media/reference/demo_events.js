import EventEmitter from "events";

// create class
class CoolEmitter extends EventEmitter {}

// initialize object
const myEmitter = new CoolEmitter();

// create event listener
myEmitter.on("event", () => console.log("Event fired..."));

// initialize event
myEmitter.emit("event");
