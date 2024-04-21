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

export const queryChildAge = async (childId: number) => {
  const data = await db.child.findFirst({
    where: {
      id: childId,
    },
    select: {
      birthDate: true,
    },
  });
  if (!data) throw new CustomError(404, "Child not found");

  const now = new Date().getTime() / 1000 / 86400;
  const birtData = data.birthDate.getTime() / 1000 / 86400;

  return (now - birtData) / 30;
};

export const queryBirtDate = async (childId: number) => {
  const data = await db.child.findFirst({
    where: {
      id: childId,
    },
    select: {
      birthDate: true,
    },
  });
  if (!data) throw new CustomError(404, "Child not found");
  return data;
};

export const queryChildFoodByDay = async (date: Date, childId: number) => {
  const data = await db.childFood.findMany({
    where: {
      childId: childId,
      mealTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    include: {
      childFoodFromFood: true,
    },
  });

  return data;
};

export const queryAllNeededFood = async () => {
  return db.food.findMany();
};
