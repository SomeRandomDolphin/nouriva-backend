import {
  queryFoodDetailbyID,
  queryFoodDetailAll,
  queryFoodWithFoodType,
} from "../repository/FoodRepository";

export const retrieveFoodbyID = async (data: number) => {
  const Food = await queryFoodDetailbyID(data);
  return Food;
};

export const retrieveFoodAll = async () => {
  const Food = await queryFoodDetailAll();
  return Food;
};

export const retrieveFoodWithFoodType = async (data: number) => {
  const FoodType = await queryFoodWithFoodType(data);
  return FoodType;
};
