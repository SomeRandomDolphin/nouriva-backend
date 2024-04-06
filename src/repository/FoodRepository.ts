import db from "../config/connectDb";
import { CustomError } from "../Utils/ErrorHandling";

export const queryFoodDetailbyID = async (idInput: number) => {
  const data = await db.food.findUnique({
    where: {
      id: idInput,
    },
    select: {
      id: true,
      name: true,
      water: true,
      energy: true,
      carbohydrate: true,
      protein: true,
      fat: true,
      fibre: true,
      foodTypeId: true,
    },
  });
  if (!data) throw new CustomError(404, "Food not found");
  return data;
};

export const queryFoodDetailAll = async () => {
  const data = await db.food.findMany();
  if (!data) throw new CustomError(404, "Food not found");
  return data;
};

export const queryFoodTypeDetailbyID = async (idInput: number) => {
  const data = await db.foodType.findUnique({
    where: {
      id: idInput,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!data) throw new CustomError(404, "Food Type not found");
  return data;
};

export const queryFoodWithFoodType = async (idInput: number) => {
  const { id } = await queryFoodTypeDetailbyID(idInput);

  const data = await db.food.findMany({
    where: {
      foodTypeId: id,
    },
    select: {
      id: true,
      name: true,
      water: true,
      energy: true,
      carbohydrate: true,
      protein: true,
      fat: true,
      fibre: true,
      foodTypeId: true,
    },
  });
  if (!data) throw new CustomError(404, "Food not found");
  return data;
};
