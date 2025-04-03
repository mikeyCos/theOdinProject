const { Router } = require("express");

const session = new Router();

session.get("/", (req, res) => {
  return res.json(
    res.locals.context.models.users[res.locals.context.currentUser.id]
  );
});

module.exports = session;
