import { Router } from "express";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";
import {
  deleteParent,
  registerParent,
  retrieveParent,
  updateParent,
} from "../controller/ParentController";

const parentRouter = Router();

parentRouter.post("/register", registerParent);
parentRouter.get("/:parent_id", retrieveParent);
parentRouter.put("/update", userAuthMiddleware, updateParent);
parentRouter.delete("/delete", userAuthMiddleware, deleteParent);

export default parentRouter;
