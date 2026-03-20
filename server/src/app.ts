import express, { Request, Response } from "express";

export const app = express();

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to Authify!");
});

app.get("/health", (_: Request, res: Response) => {
  res.send("OK");
});
