import { Router } from "express";
import {
  retrieveFoodbyID,
  retrieveFoodAll,
  retrieveFoodWithFoodType,
  foodsRecommendation,
  childFoodStatistic,
} from "../controller/FoodController";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";

const foodRouter = Router();

foodRouter.get("/", retrieveFoodAll);
foodRouter.get("/:food_id", retrieveFoodbyID);
foodRouter.get("/category/:food_type_id", retrieveFoodWithFoodType);
foodRouter.get(
  "/recommendation/:child_id",
  userAuthMiddleware,
  foodsRecommendation,
);
foodRouter.get("/statistic/:child_id", userAuthMiddleware, childFoodStatistic);

export default foodRouter;
