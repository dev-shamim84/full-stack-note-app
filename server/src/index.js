import express from "express";
import router from "./routes/api.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { EXPIRE_NUMBER, REQUEST_TIME } from "./config/config.js";
const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: REQUEST_TIME,
  max: EXPIRE_NUMBER,
  message: "Too many request please try again later .",
});
app.use(limiter);

app.set("etag", false);

app.use("/api/v1", router);

export default app;
