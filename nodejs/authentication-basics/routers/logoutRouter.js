const { Router } = require("express");

const logoutRouter = new Router();

logoutRouter.get("/", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = logoutRouter;
