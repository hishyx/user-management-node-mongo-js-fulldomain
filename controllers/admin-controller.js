import User from "../models/User.model.js";

import { loginAdminService } from "../services/admin.services.js";

//Admin Login controller

export const loginAdmin = async (req, res) => {
 
try{

   const admin=await loginAdminService(req.body)
   const { password, ...safeAdmin } = admin.toObject();
   req.session.user=safeAdmin
   res.redirect("/admin")

}catch (err) {
    req.session.error = err.message;
    return res.redirect("/admin/login");
  }
};

export const getAdminLogin = (req, res) => {
  res.render("admin/admin-login", { error: req.session.error });
  req.session.error = "";
};

export const getAdminDashboard = async (req, res) => {
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
};

export const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("admin.sid");
    res.redirect("/admin/login");
  });
};
