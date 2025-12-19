import express from "express";
import { createUser, loginUser } from "../controllers/user-controller.js";

import { deleteUser, updateUser } from "../controllers/dashboard-controller.js";

import {
  userAuthenticateMiddleware,
  loginBlocker,
} from "../middlewares/main-middleware.js";

const router = express.Router();

router.get("/", userAuthenticateMiddleware, (req, res) => {
  res.render("user/user-home", { name: req.session.user.name });
});

router.get("/login", loginBlocker, (req, res) => {
  res.render("user/user-login", { error: req.session.error });
  req.session.error = "";
});

router.get("/signup", loginBlocker, (req, res) => {
  res.render("user/user-signup", { error: req.session.error });
  req.session.error = "";
});

router.post("/signup", createUser);

router.post("/login", loginUser);

router.delete("/delete", deleteUser, (req, res) => {});

router.post("/edit", updateUser);

router.post("/create", createUser);

export default router;
