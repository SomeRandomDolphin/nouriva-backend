import { Router } from "express";
import {
  createIntake,
  delateIntakeChild,
  getIntakeByChild,
  updateIntakeChild,
} from "../controller/IntakeController";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";

const intakeRouter = Router();

intakeRouter.post("/create", userAuthMiddleware, createIntake);
intakeRouter.get("/:child_id", userAuthMiddleware, getIntakeByChild);
intakeRouter.patch("/:intake_id", userAuthMiddleware, updateIntakeChild);
intakeRouter.delete("/:intake_id", userAuthMiddleware, delateIntakeChild);

export default intakeRouter;
