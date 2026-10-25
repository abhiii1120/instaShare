import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoute from "../routes/index.route.js";
import errorMiddleware from "../middlewares/errrorhandler.middleware.js";

export default function createApp() {
  let app = express();

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
