import express from "express";

const router = express.Router();
import { mainAuthenticateMiddleware } from "../middlewares/main-middleware.js";

router.get("/", mainAuthenticateMiddleware, (req, res) => {
  res.render("main-home");
});

router.post("/logout", (req, res) => {
  console.log("logout screen");
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");

    res.redirect("/");
  });
});

export default router;
