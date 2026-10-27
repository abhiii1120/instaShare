import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRoute from "../routes/index.route.js";
import errorMiddleware from "../middlewares/errrorhandler.middleware.js";

export default function createApp() {
  let app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use(
    urlencoded({
      extended: true,
    }),
  );

  app.use("/api", indexRoute);

  app.use(errorMiddleware);

  return app;
}
