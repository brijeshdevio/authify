import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { env } from "./config/env";
import { routes } from "./routes";
import { appErrorMiddleware } from "./middleware/appError.middleware";
import { apiResponse } from "./utils/apiResponse";
import { ERROR_CODES } from "./constants/errorCodes";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Welcome to Authify API!");
});

app.get("/health", (_, res) => {
  res.send("OK");
});

app.use("/api", routes);

app.use("", (_, res) => {
  return apiResponse(res, {
    status: 404,
    message: "Route not found",
    error: {
      code: ERROR_CODES.NOT_FOUND,
      details: `Please check the route name and method.`,
    },
  });
});

app.use(appErrorMiddleware);

export default app;
