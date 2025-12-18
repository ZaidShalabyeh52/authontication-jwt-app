import express from "express";
import {
  createUserPost,
  refreshTokenPost,
  logInPost,
  logOutPost,
} from "../controllers/usersController.js";
import { requireAuth } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.post("/createUser", createUserPost);

usersRouter.post("/log-in", logInPost);

usersRouter.post("/refresh", refreshTokenPost);

usersRouter.post("/logout", logOutPost);

usersRouter.get("/auth", requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

export default usersRouter;
