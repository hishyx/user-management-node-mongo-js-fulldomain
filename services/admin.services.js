import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const loginAdminService = async (body) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    throw new Error("No user found");

  const admin = await User.findOne({ email: body.email });

  if (!admin) throw new Error("No admin found");

  const isMatch = await bcrypt.compare(body.password, admin.password);

  if (isMatch && admin.role === "admin") return admin;
  else if (isMatch && admin.role !== "admin")
    throw new Error("This account is not a admin");
  else throw new Error("Invalid credentials");
};
