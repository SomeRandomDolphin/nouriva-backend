import db from "../config/connectDb";
import env from "../config/LoacEnv";
import { CustomError } from "../Utils/ErrorHandling";
import { Prisma } from "@prisma/client";

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
