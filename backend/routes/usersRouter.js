import express from "express";
import {
  createUserPost,
  refreshTokenPost,
  logInPost,
  logOutPost,
} from "../controllers/usersController.js";
import { requireAuth, attachUserIfPresent } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.post("/ping", (req, res) => {
  console.log("BODY:", req.body);
  res.json(req.body);
});

usersRouter.post("/createUser", attachUserIfPresent, createUserPost);

usersRouter.post("/login", attachUserIfPresent, logInPost);

usersRouter.post("/refresh", refreshTokenPost);

usersRouter.post("/logout", logOutPost);

usersRouter.get("/auth", requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

export default usersRouter;
