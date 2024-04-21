import { Router } from "express";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";
import {
  deleteChild,
  registerChild,
  retriveChildDetail,
  retriveParentChilds,
  updateChild,
} from "../controller/ChildController";

const childRouter = Router();

childRouter.get("/", userAuthMiddleware, retriveParentChilds);
childRouter.post("/register", registerChild);
childRouter.get("/:child_id", userAuthMiddleware, retriveChildDetail);
childRouter.put("/:child_id", userAuthMiddleware, updateChild);
childRouter.delete("/:child_id", userAuthMiddleware, deleteChild);

export default childRouter;
