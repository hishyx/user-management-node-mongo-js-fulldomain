import session from "express-session";

//.env connection
import dotenv from "dotenv";
dotenv.config();

const adminSessionConfig = session({
  secret: process.env.SESSION_SECRET,
  name: "admin.sid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
});

const userSessionConfig = session({
  secret: process.env.SESSION_SECRET,
  name: "user.sid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
});

export { adminSessionConfig, userSessionConfig };
