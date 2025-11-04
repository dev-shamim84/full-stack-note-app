import "dotenv/config";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./src/config/config.js";
import app from "./src/index.js";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    app.listen(PORT || 5000, () => {
      console.log(`SERVER IS RUNNING PORT : ${PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE IS NOT CONNECTED", error);
  });
