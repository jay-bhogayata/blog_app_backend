import app from "./app.js";
import mongoose from "mongoose";
import config from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB connection success");
    app.on("error", (error) => {
      console.error("Some error occurred in app :", error);
      process.exit(1);
    });
    app.listen(config.PORT, () => {
      console.log(`server is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
})();
