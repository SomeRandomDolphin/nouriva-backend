import { Router } from "express";
import {
  deleteChild,
  registerChild,
  retriveChildDetail,
  retriveParentChilds,
  updateChild,
} from "../controller/ChildController";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";

const childRouter = Router();

childRouter.get("/", userAuthMiddleware, retriveParentChilds);

childRouter.get("/:child_id", userAuthMiddleware, retriveChildDetail);

childRouter.post("/register", userAuthMiddleware, registerChild);

childRouter.put("/:child_id", userAuthMiddleware, updateChild);

childRouter.delete("/:child_id", userAuthMiddleware, deleteChild);

export default childRouter;
