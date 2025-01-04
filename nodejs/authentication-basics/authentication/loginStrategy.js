const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../db/queries");

/*
 * This function is what will be called when we use the passport.authenticate() function later.
 * Basically, it takes a username and password, tries to find the user in our DB, and then makes sure that the user’s password matches the given password.
 * If all of that works out (there’s a user in the DB, and the passwords match) then it authenticates our user and moves on!
 * We will not be calling this function directly, so you won’t have to supply the done function.
 * This function acts a bit like a middleware and will be called for us when we ask passport to do the authentication later.
 */

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    console.log("username:", username);
    const user = await getUser({ username });

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = loginStrategy;
