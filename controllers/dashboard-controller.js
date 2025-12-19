import User from "../models/User.model.js";

export const deleteUser = async (req, res) => {
  if (!req.session.user || !req.session.user.role === "admin") {
    return res.send("Error");
  }

  try {
    await User.deleteOne({ _id: req.body.userId });
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  if (!req.session.user || !req.session.user.role === "admin") {
    return res.send("Error");
  }

  let user = {};

  user.name = req.body.fname;
  user.email = req.body.email;
  user.role - req.body.role;

  let userExists = await User.findById(req.body.id);

  if (userExists) {
    await User.findByIdAndUpdate(req.body.id, user);
    res.redirect("/admin");
  }
};
