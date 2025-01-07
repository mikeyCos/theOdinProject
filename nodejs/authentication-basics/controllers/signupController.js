const { createUser } = require("../db/queries");
const bcrypt = require("bcryptjs");

const signupController = {
  getSignup: (req, res) => {
    console.log("getSignup running...");
    const { user } = req;
    res.render("signup", {
      title: "Sign Up",
    });
  },
  postSignup: async (req, res, next) => {
    console.log("postSignup running...");
    try {
      const { username, password } = req.body;
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) throw new Error(err);
        await createUser({ username, password: hashedPassword });
      });

      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = signupController;
