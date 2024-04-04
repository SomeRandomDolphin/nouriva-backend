import express, { Express, Request, Response } from "express";
import cors from "cors";
import env from "./config/LoacEnv";
import favicon from "serve-favicon";
import path from "path";

import authRouter from "./router/AuthRouter";
import parentRouter from "./router/ParentRouter";
import childRouter from "./router/ChildRouter";

const app: Express = express();
const PORT = env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use((req, res, next) => {
  const path = req.path;
  res.on("finish", () => {
    console.log({
      method: req.method,
      path: path,
      ip: req.ip,
      statusCode: res.statusCode,
    });
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/parents", parentRouter);
app.use("/api/childs", childRouter);

app.get("/api", (_: Request, res: Response) => {
  res.send("Nouriva API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
