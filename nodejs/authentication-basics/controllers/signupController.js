const { createUser } = require("../db/queries");

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
      createUser(req.body);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = signupController;
