const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const {
  getAllUsers,
  getUsers,
  insertUser,
  deleteUsers,
} = require("../db/queries");

const validateUsername = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain text.")
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be between 3 and 10 characters long."),
];

const indexController = {
  indexGet: asyncHandler(async (req, res) => {
    const { search } = req.query;
    if (search) {
      const users = await getUsers(search);
      console.log("users", users);
      res.render("index", {
        title: "Home",
        users,
      });
    } else {
      const users = await getAllUsers();
      res.render("index", {
        title: "Home",
        users,
      });
    }
  }),
  newGet: asyncHandler((req, res) => {
    res.render("new", {
      title: "New",
    });
  }),
  newPost: [
    validateUsername,
    asyncHandler(async (req, res) => {
      const validationErrors = validationResult(req);
      const { username } = req.body;
      const errors = validationErrors
        .array()
        .reduce((accumulator, currentError) => {
          const { path, value, msg } = currentError;
          return { ...accumulator, [path]: msg };
        }, {});

      if (!validationErrors.isEmpty()) {
        return res.status(400).render("new", {
          title: "New",
          errors,
          username,
        });
      }

      console.log("username to be saved in db: ", username);
      // Before redirecting, do something with a database
      await insertUser(username);
      res.redirect("/");
    }),
  ],
  postDelete: asyncHandler(async (req, res) => {
    await deleteUsers();
    res.redirect("/");
  }),
};

module.exports = indexController;
