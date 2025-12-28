import express from "express";

import User from "../models/User.model.js";

import {
  loginAdmin,
  getAdminLogin,
  getAdminDashboard,
  logoutAdmin,
} from "../controllers/admin-controller.js";

import { createUser } from "../controllers/user-controller.js";

import { deleteUser, updateUser } from "../controllers/dashboard-controller.js";

import {
  adminAuthenticateMiddleware,
  loginBlocker,
} from "../middlewares/main-middleware.js";

const router = express.Router();

let error = "";

router.get("/login", loginBlocker, getAdminLogin);

router.get("/", adminAuthenticateMiddleware, getAdminDashboard);

router.post("/login", loginAdmin);

router.post("/create", createUser);
router.delete("/delete", deleteUser);
router.post("/edit", updateUser);

router.post("/logout", logoutAdmin);

export default router;
