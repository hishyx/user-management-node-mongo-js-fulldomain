import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database Connected");
  } catch (err) {
    logger.error(`Mongo connection error: ${err.message}`);
    console.error(err); // optional: prints full stack trace
    process.exit(1);
  }
};

export default connectDB;
