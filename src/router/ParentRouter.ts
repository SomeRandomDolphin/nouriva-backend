import { Router } from "express";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";
import {
  deleteParent,
  registerParent,
  retrieveParent,
  updateParent,
} from "../controller/ParentController";

const userRouter = Router();

userRouter.post("/register", registerParent);
userRouter.get("/:parent_id", retrieveParent);
userRouter.put("/update", userAuthMiddleware, updateParent);
userRouter.delete("/delete", userAuthMiddleware, deleteParent);

export default userRouter;
