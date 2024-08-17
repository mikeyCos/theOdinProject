const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const validateUsername = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain text.")
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be between 3 and 10 characters long."),
];

const indexController = {
  indexGet: asyncHandler((req, res) => {
    res.render("index", {
      title: "Home",
    });
  }),
  newGet: asyncHandler((req, res) => {
    res.render("new", {
      title: "New",
    });
  }),
  newPost: [validateUsername, asyncHandler((req, res) => {})],
};

module.exports = indexController;
