import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    req.session.error = "Invalid email address";
    return res.redirect("/user/signup");
  }

  if (await User.findOne({ email: req.body.email })) {
    req.session.error = "User with same email already exists";
    return res.redirect("/user/signup");
  }

  const user = {};

  if (req.body.password === req.body.confirm_password) {
    user.name = req.body.fname;

    user.email = req.body.email;

    user.password = await bcrypt.hash(req.body.password, 10);

    if (
      req.path == "/user/create" ||
      (req.session.user && req.session.user.role == "admin")
    ) {
      user.role = req.body.role;
    } else {
      user.role = "user";
    }
    try {
      await User.create(user);

      req.session.user = !req.session.user ? user : req.session.user;

      if (req.session.user.role == "user") res.redirect("/user");
      else res.redirect("/admin");
    } catch (err) {
      req.session.error = "Something went wrong";

      if (req.session.user.role == "user") return res.redirect("/user/signup");
      else return res.redirect("/admin");
    }
  } else {
    req.session.error = "Passwords Doesnt Match";
    if (req.session.user.role == "user") res.redirect("/user/signup");
    else res.redirect("/admin");
  }
};

//Login user

export const loginUser = async (req, res) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    req.session.error = "Invalid email address";
    return res.redirect("/user/login");
  }

  let user;

  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.session.error = "No user found";
      return res.redirect("/user/login");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch && user.role === "user") {
      req.session.user = user;
      res.redirect("/user");
    } else if (isMatch && user.role !== "user") {
      req.session.error = "This account is not a user";

      res.redirect("user/login");
    } else {
      req.session.error = "Invalid credentials";
      return res.redirect("/user/login");
    }
  } catch (err) {
    req.session.error = "No user found";
    return res.redirect("/user/login");
  }
};
