import { Router } from "express";
import {
  retrieveFoodbyID,
  retrieveFoodAll,
  retrieveFoodWithFoodType,
} from "../controller/FoodController";

const userRouter = Router();

userRouter.get("/", retrieveFoodAll);
userRouter.get("/:food_id", retrieveFoodbyID);
userRouter.get("/category/:food_type_id", retrieveFoodWithFoodType);
export default userRouter;
