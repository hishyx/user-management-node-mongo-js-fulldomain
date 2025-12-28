import express from "express";
import {
  createUser,
  loginUser,
  getUserHome,
  getUserLogin,
  getUserSignup,
  userLogout,
} from "../controllers/user-controller.js";

// import { deleteUser, updateUser } from "../controllers/dashboard-controller.js";

import {
  userAuthenticateMiddleware,
  loginBlocker,
} from "../middlewares/main-middleware.js";

const router = express.Router();

router.get("/", userAuthenticateMiddleware, getUserHome);

router.get("/login", loginBlocker, getUserLogin);

router.get("/signup", loginBlocker, getUserSignup);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/logout", userLogout);

export default router;
