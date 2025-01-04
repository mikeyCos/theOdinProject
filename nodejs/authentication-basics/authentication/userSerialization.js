const { getUser } = require("../db/queries");

/*
 * When a session is created, passport.serializeUser will receive the user object found from a successful login and store its id property in the session data.
 * Upon some other request, if it finds a matching session for that request, passport.deserializeUser will retrieve the id we stored in the session data.
 * We then use that id to query our database for the specified user, then done(null, user) attaches that user object to req.user.
 * Now in the rest of the request, we have access to that user object via req.user.
 */
const serializeUser = (user, done) => {
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
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
