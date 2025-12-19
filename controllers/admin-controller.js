import User from "../models/User.model.js";
import bcrypt from "bcrypt";

//Admin Login controller

export const loginAdmin = async (req, res) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    req.session.error = "Invalid email address";
    return res.redirect("/admin/login");
  }

  let admin;

  try {
    admin = await User.findOne({ email: req.body.email });

    if (!admin) {
      req.session.error = "Admin not found";
      return res.redirect("/admin/login");
    }

    const isMatch = await bcrypt.compare(req.body.password, admin.password);

    if (isMatch && admin.role === "admin") {
      req.session.user = admin;
      res.redirect("/admin");
    } else if (isMatch && admin.role !== "admin") {
      req.session.error = "Is not a Admin";
      return res.redirect("/admin/login");
    } else {
      req.session.error = "Invalid credentials";
      return res.redirect("/admin/login");
    }
  } catch (err) {
    req.session.error = "Admin not found";
    return res.redirect("/admin/login");
  }
};
