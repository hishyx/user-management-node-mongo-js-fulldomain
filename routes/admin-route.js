import express from "express";

import User from "../models/User.model.js";

import { loginAdmin } from "../controllers/admin-controller.js";

import {
  adminAuthenticateMiddleware,
  loginBlocker,
} from "../middlewares/main-middleware.js";

const router = express.Router();

let error = "";

router.get("/login", loginBlocker, (req, res) => {
  res.render("admin/admin-login", { error: req.session.error });
  req.session.error = "";
});

router.get("/", adminAuthenticateMiddleware, async (req, res) => {
  let condition;

  if (!req.query.search) {
    condition = { role: "user" };
  } else {
    condition = {
      role: "user",
      name: { $regex: "^" + req.query.search, $options: "i" },
    };
  }

  const user = await User.find(condition);

  res.render("admin/admin-dashboard", {
    user: user,
    error: req.session.error,
    searchValue: req.query.search,
  });
});

router.post("/login", loginAdmin);

export default router;
