import { Router } from "express";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";
import { loginParent, getParentProfile } from "../controller/AuthController";

const authRouter = Router();

authRouter.post("/login", loginParent);
authRouter.get("/me", userAuthMiddleware, getParentProfile);

export default authRouter;
