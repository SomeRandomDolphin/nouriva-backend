import { Router } from "express";
import {
  retrieveFoodbyID,
  retrieveFoodAll,
  retrieveFoodWithFoodType,
  foodsRecommendation,
} from "../controller/FoodController";

const foodRouter = Router();

foodRouter.get("/", retrieveFoodAll);
foodRouter.get("/:food_id", retrieveFoodbyID);
foodRouter.get("/category/:food_type_id", retrieveFoodWithFoodType);
foodRouter.get("/recommendation/:child_id", foodsRecommendation);

export default foodRouter;
