import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.post("/", userController.createUser);

export default userRouter;
