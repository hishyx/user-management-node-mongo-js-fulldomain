import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const createUserService = async (body, path) => {
  if (path == "/admin/create") body.confirm_password = body.password;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw new Error("Invalid email");
  }

  if (await User.findOne({ email: body.email })) {
    throw new Error("User with same email already exists");
  }

  if (body.password === body.confirm_password) {
    const user = {
      name: body.fname,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      role: path == "/user/create" ? body.role : "user",
    };

    return await User.create(user);
  } else {
    throw new Error("Passwords doesnt match");
  }
};

export const loginUserService = async (body) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    throw new Error("No user found");

  const user = await User.findOne({ email: body.email });

  if (!user) throw new Error("No user found");

  const isMatch = await bcrypt.compare(body.password, user.password);

  if (isMatch && user.role === "user") return user;
  else if (isMatch && user.role !== "user")
    throw new Error("This account is not a user");
  else throw new Error("Invalid credentials");
};

export const updateUserService = async (body, accessedSession) => {
  if (!accessedSession || accessedSession.role !== "admin") {
    throw new Error("Error");
  }

  const user = {
    name: body.fname,
    email: body.email,
    role: body.role,
  };

  let userExists = await User.findById(body.id);

  if (userExists) {
    return await User.findByIdAndUpdate(body.id, user);
  } else {
    throw new Error("User not found");
  }
};

export const deleteUserService = async (body, accessedSession) => {
  if (!accessedSession || accessedSession.role !== "admin") {
    throw new Error("Error");
  }

  let userExists = await User.findById(body.userId);

  if (!userExists) {
    throw new Error("User not found");
  }
  return await User.findByIdAndDelete(body.userId);
};
