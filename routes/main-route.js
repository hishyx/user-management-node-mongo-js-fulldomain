import express from "express";

const router = express.Router();
import { mainAuthenticateMiddleware } from "../middlewares/main-middleware.js";

router.get("/", mainAuthenticateMiddleware, (req, res) => {
  res.render("main-home");
});

export default router;
