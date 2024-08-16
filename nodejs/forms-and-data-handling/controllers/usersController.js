const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters long.";
const emailErr = "must be a valid email.";
const ageErr = "must be between 18 and 120.";
const bioErr = "must be a between 2 and 200 characters long.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
  body("age")
    .trim()
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${ageErr}`),
  body("bio")
    .trim()
    .optional()
    .isLength({ max: 200 })
    .withMessage(`Bio ${bioErr}`),
];

const usersController = {
  usersListGet: asyncHandler((req, res) => {
    res.render("index", {
      title: "User List",
      users: usersStorage.getUsers(),
    });
  }),
  usersCreateGet: asyncHandler((req, res) => {
    res.render("createUser", {
      title: "Create user",
    });
  }),
  usersCreatePost: [
    validateUser,
    asyncHandler((req, res) => {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "Create user",
          errors: errors.array(),
        });
      }

      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.addUser({ firstName, lastName, email, age, bio });
      res.redirect("/");
    }),
  ],
  usersUpdateGet: asyncHandler((req, res) => {
    const { userID } = req.params;
    const user = usersStorage.getUser(userID);
    console.log(userID);
    console.log(user);
    res.render("updateUser", {
      title: "Update user",
      user: {
        id: userID,
        ...user,
      },
    });
  }),
  usersUpdatePost: [
    validateUser,
    asyncHandler((req, res) => {
      const user = usersStorage.getUser(req.params.userID);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user,
          errors: errors.array(),
        });
      }

      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.userID, {
        firstName,
        lastName,
        email,
        age,
        bio,
      });
      res.redirect("/");
    }),
  ],
  usersDeletePost: asyncHandler((req, res) => {
    const { userID } = req.params;
    usersStorage.deleteUser(userID);
    res.redirect("/");
  }),
  usersSearchGet: asyncHandler((req, res) => {
    res.render("searchUser", {
      title: "User Search",
    });
  }),
  usersSearchPost: asyncHandler((req, res) => {
    const searchResults = [];
    console.log("line 115", req.body);
    // This is probably overkill to filter out object properties with an empty string value
    // const searchQuery = createSearchQuery(req.body);
    const foo = usersStorage.filterUsers(req.body);
    console.log(foo);
    res.render("searchUser", {
      title: "User Search Results",
    });
  }),
};

const createSearchQuery = (searchBody) => {
  return Object.entries(searchBody).reduce((accumulator, [key, value]) => {
    if (value !== "") {
      return { ...accumulator, [key]: value };
    }
    return accumulator;
  }, {});
};

module.exports = usersController;
