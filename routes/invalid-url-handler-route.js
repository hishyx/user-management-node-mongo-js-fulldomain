import express from "express";

const router = express.Router();

router.use("/admin", (req, res) => {
  res.render("admin/admin-404");
});

router.use("/user", (req, res) => {
  res.render("user/user-404");
});

router.use("/", (req, res) => {
  res.render("404");
});

export default router;
