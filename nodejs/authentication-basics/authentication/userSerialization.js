const { getUser } = require("../db/queries");

/*
 * passport.serializeUser takes a callback which contains the information we wish to store in the session data. passport.deserializeUser is called when retrieving a session, where it will extract the data we “serialized” in it then ultimately attach something to the .user property of the request object (req.user) for use in the rest of the request.
 *
 * When a session is created, passport.serializeUser will receive the user object found from a successful login and store its id property in the session data.
 * Upon some other request, if it finds a matching session for that request, passport.deserializeUser will retrieve the id we stored in the session data.
 * We then use that id to query our database for the specified user, then done(null, user) attaches that user object to req.user.
 * Now in the rest of the request, we have access to that user object via req.user.
 */
const serializeUser = (user, done) => {
  console.log("serializeUser running...");
  console.log("user:", user);
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
  console.log("deserializeUser running...");
  try {
    const user = await getUser({ id });
    done(null, user);
  } catch (err) {
    done(err);
  }
};

module.exports = {
  serializeUser,
  deserializeUser,
};
