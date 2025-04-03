const { Router } = require("express");

const user = new Router();

user.get("/", (req, res) => {
  return res.json(Object.values(res.locals.context.models.users));
});

user.get("/:userId", (req, res) => {
  return res.json(res.locals.context.users[req.params.userId]);
});

user.put("/:userId", (req, res) => {
  /* return res.send(
    `PUT HTTP method on originalUrl: ${req.originalUrl} with params.userId: ${req.params.userId}`
  ); */
});

user.delete("/", (req, res) => {
  return res.send(
    `Received a DELETE HTTP method originalUrl: ${req.originalUrl}`
  );
});

module.exports = user;
