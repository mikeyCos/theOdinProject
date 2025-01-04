const { Router } = require("express");
const passport = require("passport");

const loginRouter = new Router();

/*
 * As you can see, all we have to do is call passport.authenticate().
 * This middleware performs numerous functions behind the scenes.
 * Among other things, it looks at the request body for parameters named username and password then runs the LocalStrategy function that we defined earlier to see if the username and password are in the database.
 * It then creates a session cookie that gets stored in the user’s browser and used in all future requests to see whether or not that user is logged in.
 * It can also redirect you to different routes based on whether the login is a success or a failure.
 * If we had a separate login page we might want to go back to that if the login failed, or we might want to take the user to their user dashboard if the login is successful.
 * Since we’re keeping everything in the index we want to go back to “/” no matter what.
 */
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = loginRouter;
