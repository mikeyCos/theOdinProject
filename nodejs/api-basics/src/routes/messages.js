const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const messages = new Router();

messages.get("/", (req, res) => {
  return res.json(Object.values(res.locals.context.models.messages));
});

// curl -w "\n" -X GET http://localhost:3000/messages/:messageId
messages.get("/:messageId", (req, res) => {
  return res.json(res.locals.context.models.messages[req.params.messageId]);
});

// curl -w "\n" -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hello world"}'
messages.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    authorId: res.locals.context.currentUser.id,
    text: req.body.text,
  };

  res.locals.context.models.messages[id] = message;

  return res.json(message);
});

// curl -w "\n" -X DELETE http://localhost:3000/messages/:messageId
messages.delete("/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    res.locals.context.models.messages;

  res.locals.context.models.messages = otherMessages;
  return res.json(message);
});
module.exports = messages;
