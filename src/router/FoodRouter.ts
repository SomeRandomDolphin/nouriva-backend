import { Router } from "express";
import {
  retrieveFoodbyID,
  retrieveFoodAll,
} from "../controller/FoodController";

const userRouter = Router();

userRouter.get("/", retrieveFoodAll);
userRouter.get("/:food_id", retrieveFoodbyID);
export default userRouter;
