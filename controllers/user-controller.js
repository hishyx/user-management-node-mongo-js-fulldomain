import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import {
  createUserService,
  loginUserService,
} from "../services/user.services.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body, req.originalUrl);
    const { password, ...safeUser } = user.toObject();

    if (req.originalUrl.includes("/admin")) {
      res.redirect("/admin");
    } else {
      req.session.user = safeUser;
      res.redirect("/user");
    }
  } catch (err) {
    req.session.error = err.message;

    if (req.originalUrl.includes("/user")) return res.redirect("/user/signup");
    else return res.redirect("/admin");
  }
};

//Login user

export const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    const { password, ...safeUser } = user.toObject();

    req.session.user = safeUser;

    return res.redirect("/user");
  } catch (err) {
    req.session.error = err.message;
    return res.redirect("/user/login");
  }
};

export const getUserHome = (req, res) => {
  res.render("user/user-home", { name: req.session.user.name });
};

export const getUserLogin = (req, res) => {
  res.render("user/user-login", { error: req.session.error });
  req.session.error = "";
};

export const getUserSignup = (req, res) => {
  res.render("user/user-signup", { error: req.session.error });
  req.session.error = "";
};

//Logout user

export const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("user.sid");

    res.redirect("/user/");
  });
};
