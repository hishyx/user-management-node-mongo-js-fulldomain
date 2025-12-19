import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/user-route.js";
import adminRouter from "./routes/admin-route.js";
import mainRouter from "./routes/main-route.js";

import inavlidHandlerRouter from "./routes/invalid-url-handler-route.js";

//session config import

import sessionConfig from "./config/session.js";

//.env connection
import dotenv from "dotenv";
dotenv.config();

//import connectDB
import connectDB from "./config/db.js";
import nocache from "nocache";

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Connect DB

let server = express();

//Middleware usages
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.use(nocache());

server.use(sessionConfig);

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.use("/", mainRouter);
server.use("/user/", userRouter);
server.use("/admin/", adminRouter);

server.use(inavlidHandlerRouter);

server.listen(4555);
