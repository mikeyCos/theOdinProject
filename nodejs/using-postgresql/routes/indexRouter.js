const express = require("express");
const indexController = require("../controllers/indexController.js");

const indexRouter = express.Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/new", indexController.newGet);
indexRouter.post("/new", indexController.newPost);
indexRouter.post("/delete", indexController.postDelete);

module.exports = indexRouter;
