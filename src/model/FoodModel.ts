import { Food as FoodDB } from "@prisma/client";
export interface Food {
  fibre: number;
  fat: number;
  water: number;
  energy: number;
  carbohydrate: number;
  protein: number;
}

export interface FoodAmount {
  FoodDB: FoodDB;
  amount: number;
}

export interface StatReq {
  start: Date;
  end: Date;
}

export const newFoodStats = (): Food => {
  return {
    water: 0,
    energy: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    fibre: 0,
  };
};
