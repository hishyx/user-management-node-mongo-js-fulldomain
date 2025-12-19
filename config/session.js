import session from "express-session";

//.env connection
import dotenv from "dotenv";
dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
});

export default sessionConfig;
