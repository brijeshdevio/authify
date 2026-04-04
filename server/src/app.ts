import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { UAParser } from "ua-parser-js";
import { env } from "./config/env";
import { routes } from "./routes";
import { appErrorMiddleware } from "./middleware/appError.middleware";
import { apiResponse } from "./utils/apiResponse";
import { ERROR_CODES } from "./constants/errorCodes";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  let type = "laptop"; // default

  if (device.type === "mobile") type = "phone";
  else if (device.type === "tablet") type = "tablet";

  const deviceName = `${os.name || "Unknown OS"} - ${browser.name || "Unknown Browser"}`;
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    null;
  res.json({
    ipAddress: ip,
    userAgent: req.headers["user-agent"],
    deviceName,
    type,
    device,
    os,
    browser,
  });
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
