import User from "../models/User.model.js";

export const adminAuthenticateMiddleware = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else if (req.session.user && req.session.user.role !== "admin") {
    return res.redirect("/user");
  } else {
    return res.redirect("/admin/login");
  }
};

export const userAuthenticateMiddleware = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("user/login");
  }

  const userExists = await User.findOne({ email: req.session.user.email });

  if (!userExists) {
    return req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.redirect("user/login");
      }

      res.clearCookie("connect.sid");
      return res.redirect("user/login");
    });
  }

  req.session.user = userExists;

  if (req.session.user && req.session.user.role === "user") {
    next();
  } else if (req.session.user && req.session.user.role !== "user") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/user/login");
  }
};

export const mainAuthenticateMiddleware = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else if (req.session.user.role === "admin") {
    return res.redirect("/admin/");
  } else if (req.session.user.role === "user") {
    return res.redirect("/user/");
  }
};

//Block access to login and signup pages

export const loginBlocker = (req, res, next) => {
  if (req.session.user && req.session.user.role === "user") {
    return res.redirect("/user");
  } else if (req.session.user && req.session.user.role === "admin") {
    return res.redirect("/admin");
  } else {
    next();
  }
};
