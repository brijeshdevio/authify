import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler";
import { sendSuccess } from "./lib/response";

const app = express();

// ─── Core Middleware ────────────────────────────────────────
app.use(express.json({ limit: "16kb" })); // Prevent large payload abuse
app.use(cookieParser());

// ─── Health Check ───────────────────────────────────────────
app.get("/", (_req, res) => {
  sendSuccess(res, 200, { service: "authify" });
});

app.get("/health", (_req, res) => {
  sendSuccess(res, 200, { uptime: process.uptime() });
});

// ─── API Routes ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ─── Global Error Handler (must be last) ────────────────────
app.use(errorHandler);

export default app;
