import { StatusCodes } from "http-status-codes";
import {
  queryFoodDetailbyID,
  queryFoodDetailAll,
} from "../repository/FoodRepository";
import { CustomError } from "../Utils/ErrorHandling";

export const retrieveFoodbyID = async (data: number) => {
  const Food = await queryFoodDetailbyID(data);
  return Food;
};

export const retrieveFoodAll = async () => {
  const Food = await queryFoodDetailAll();
  return Food;
};
