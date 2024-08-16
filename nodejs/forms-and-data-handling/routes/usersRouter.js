const { Router } = require("express");
const usersController = require("../controllers/usersController.js");

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);
usersRouter.get("/:userID/update", usersController.usersUpdateGet);
usersRouter.post("/:userID/update", usersController.usersUpdatePost);
usersRouter.post("/:userID/delete", usersController.usersDeletePost);
usersRouter.get("/search", usersController.usersSearchGet);
usersRouter.post("/search", usersController.usersSearchPost);

module.exports = usersRouter;
