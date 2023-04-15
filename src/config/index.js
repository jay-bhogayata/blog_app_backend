import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog-app",
  JWT_SECRET: process.env.JWT_SECRET || "this is a jwt secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",
};

export default config;
