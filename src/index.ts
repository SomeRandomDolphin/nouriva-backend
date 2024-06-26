import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import env from "./config/LoacEnv";
import favicon from "serve-favicon";
import path from "path";

import authRouter from "./router/AuthRouter";
import parentRouter from "./router/ParentRouter";
import foodRouter from "./router/FoodRouter";
import intakeRouter from "./router/IntakeRouter";
import childRouter from "./router/ChildRouter";
import Logger from "@ptkdev/logger";
const log = new Logger();

const app: Express = express();
const PORT = env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// handling invalid JSON body
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 400) {
    res.status(400).json({ message: err.message, success: false });
    return;
  }
  next(err);
});

// logging middleware
app.use((req, res, next) => {
  const path = req.path;
  const startTime = Date.now();
  res.on("finish", () => {
    log.info(
      `method: ${req.method}, path: ${path}, ip: ${req.ip}, statusCode: ${res.statusCode}, latency: ${Date.now() - startTime}ms`,
    );
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/parents", parentRouter);
app.use("/api/foods", foodRouter);
app.use("/api/intake", intakeRouter);
app.use("/api/childs", childRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("Nouriva API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
