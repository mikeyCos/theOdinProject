const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { serializeUser, deserializeUser } = require("./userSerialization");
const { getUser } = require("../db/queries");

/*
 * This function is what will be called when we use the passport.authenticate() function later.
 * Basically, it takes a username and password, tries to find the user in our DB, and then makes sure that the user’s password matches the given password.
 * If all of that works out (there’s a user in the DB, and the passwords match) then it authenticates our user and moves on!
 * We will not be calling this function directly, so you won’t have to supply the done function.
 * This function acts a bit like a middleware and will be called for us when we ask passport to do the authentication later.
 * Why does this only run if username and password exist?
 */
const verifyCallback = async (username, password, done) => {
  console.log("loginStrategy running...");
  try {
    console.log("username:", username);
    const user = await getUser({ username });
    console.log("user:", user);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("match:", match);

    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const loginStrategy = new LocalStrategy(verifyCallback);

passport.use(loginStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// module.exports = loginStrategy;
