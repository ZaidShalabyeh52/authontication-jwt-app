import express from "express";
import {
  createUserPost,
  refreshTokenPost,
  logInPost,
  logOutPost,
} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/createUser", createUserPost);

usersRouter.post("/log-in", logInPost);

usersRouter.post("/refresh", refreshTokenPost);

usersRouter.post("/logout", logOutPost);

export default usersRouter;
