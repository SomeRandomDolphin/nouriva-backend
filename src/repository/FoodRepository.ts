import db from "../config/connectDb";
import { CustomError } from "../Utils/ErrorHandling";
import { Food, IdealFoodConsumption } from "../public/StaticData";

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

export const queryChildFoodToday = async (childId: number) => {
  const data = await db.childFood.findMany({
    where: {
      childId: childId,
      mealTime: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
  if (!data) throw new CustomError(404, "Food not found");
  return data;
};

export const queryFat = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      fat: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryFibre = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      fibre: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryProtein = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      protein: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryCarbohydrate = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      carbohydrate: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryWater = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      water: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryEnergy = async (gr: number, normal: number) => {
  return await db.food.findMany({
    where: {
      energy: {
        gte: gr,
        lte: normal,
      },
    },
  });
};

export const queryAllNeededFood = async (
  key: string[],
  ideal: IdealFoodConsumption,
) => {
  const data: Food[] = [];
  const lenKey = key.length;
  for (let i = 0; i < lenKey; i++) {
    let newData: Food[];
    if (key[i] === "fat") {
      newData = await queryFat(ideal.fat.min, ideal.fat.max);
    } else if (key[i] === "fibre") {
      newData = await queryFibre(ideal.fibre.min, ideal.fibre.max);
    } else if (key[i] === "protein") {
      newData = await queryProtein(ideal.protein.min, ideal.protein.max);
    } else if (key[i] === "carbohydrate") {
      newData = await queryCarbohydrate(
        ideal.carbohydrate.min,
        ideal.carbohydrate.max,
      );
    } else if (key[i] === "water") {
      newData = await queryWater(ideal.water.min, ideal.water.max);
    } else if (key[i] === "energy") {
      newData = await queryEnergy(ideal.energy.min, ideal.energy.max);
    }
    newData.forEach((element) => {
      data.push(element);
    });
  }
  return data;
};
