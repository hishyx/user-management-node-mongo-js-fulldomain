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
    return res.redirect("/user/login");
  }

  const userExists = await User.findOne({ email: req.session.user.email });

  if (!userExists) {
    return req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.redirect("/user/login");
      }

      res.clearCookie("user.sid");
      return res.redirect("/user/login");
    });
  }

  req.session.user = userExists;

  if (req.session.user && req.session.user.role === "user") {
    next();
  } else if (req.session.user && req.session.user.role !== "user") {
    return req.session.destroy((err) => {
      if (err) console.error(err);
      res.clearCookie("user.sid");
      return res.redirect("/user/login");
    });
  } else {
    return res.redirect("/user/login");
  }
};

export const mainAuthenticateMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  if (req.session.user.role === "user") {
    return res.redirect("/user/");
  }

  // admin or any other role → just allow
  return next();
};

//Block access to login and signup pages

export const loginBlocker = (req, res, next) => {
  const isAdminRoute = req.originalUrl.startsWith("/admin");

  // Admin role in a non-admin route (User session)
  if (req.session.user && req.session.user.role === "admin" && !isAdminRoute) {
    req.session.destroy((err) => {
      if (err) console.error("Session destroy error:", err);
      res.clearCookie("user.sid");
      next();
    });
    return;
  }

  if (req.session.user && req.session.user.role === "user") {
    if (isAdminRoute) {
      // Allow Admin Login page even if logged in as User
      return next();
    }
    return res.redirect("/user");
  } else if (req.session.user && req.session.user.role === "admin") {
    return res.redirect("/admin");
  } else {
    next();
  }
};
