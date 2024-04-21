import {
  queryFoodDetailbyID,
  queryFoodDetailAll,
  queryFoodWithFoodType,
  queryAllNeededFood,
  queryChildFoodByDay,
  queryBirtDate,
  queryChildAge,
} from "../repository/FoodRepository";
import { Food as FoodDB } from "@prisma/client";
import * as Static from "../public/StaticData";
import * as Model from "../model/FoodModel";
import { queryCheckChildParent } from "../repository/ChildRepository";

export const retrieveFoodbyID = async (data: number) => {
  const Food = await queryFoodDetailbyID(data);
  return Food;
};

export const retrieveFoodAll = async () => {
  const Food = await queryFoodDetailAll();
  return Food;
};

export const retrieveChildFoodStatisic = async (
  parentId: number,
  childId: number,
  data: Model.StatReq,
) => {
  await queryCheckChildParent(parentId, childId);
  const Stats = [];
  const start = new Date(data.start);
  const end = new Date(new Date(data.end.setHours(23, 59, 999)));

  while (start <= end) {
    // harus di check setiap iterasi karena bisa saja usia bulan berubah
    const { birthDate } = await queryBirtDate(childId);

    const childAge =
      (start.getTime() - birthDate.getTime()) / 1000 / 86400 / 30;

    const idealChildFoodDialy = Static.dailyFoods.find(
      (df) => df.age == Number(childAge.toFixed(0)),
    );

    const foodDay = await queryChildFoodByDay(start, childId);
    let childFoodToday = Model.newFoodStats();

    for (const ft of foodDay) {
      childFoodToday = countDialyFood(
        { FoodDB: ft.childFoodFromFood, amount: ft.amount },
        childFoodToday,
      );
    }

    const childFoodPercentage = countPercentage(
      childFoodToday,
      idealChildFoodDialy,
      true,
    );

    const std = stdev(childFoodPercentage);

    const score = (100 - std) / 100;

    Stats.push({
      date: new Date(start).toDateString(),
      ...childFoodPercentage,
      score: score < 0 ? 0 : Number(score.toPrecision(2)),
    });

    start.setDate(start.getDate() + 1);
  }
  return Stats;
};

export const retrieveFoodWithFoodType = async (data: number) => {
  const FoodType = await queryFoodWithFoodType(data);
  return FoodType;
};

export const foodsRecommendation = async (
  parentId: number,
  childId: number,
) => {
  await queryCheckChildParent(parentId, childId);

  // dapatkan makanna hari ini
  const foodToday = await queryChildFoodByDay(new Date(), childId);

  let childFoodToday = Model.newFoodStats();

  // cari ideal food dialy
  const childAge = await queryChildAge(childId);

  const idealChildFoodDialy = Static.dailyFoods.find(
    (df) => df.age == Number(childAge.toFixed(0)),
  );

  // hitung makanan yang udah di konsumsi hari ini
  async function childFood() {
    for (const ft of foodToday) {
      childFoodToday = countDialyFood(
        { FoodDB: ft.childFoodFromFood, amount: ft.amount },
        childFoodToday,
      );
    }
  }
  await childFood();

  // cari persentase
  let childFoodPercentage = countPercentage(
    childFoodToday,
    idealChildFoodDialy,
    true,
  );

  // standart deviasi
  let std = stdev(childFoodPercentage);

  const PosibleFoods = await queryAllNeededFood();

  let FoodList: Model.FoodAmount[] = [];

  const startStd = std;
  let finalPersentage = childFoodPercentage;

  // algoritma yang akan meneukan rekomendasi makanan terbaik
  for (let i = 0; i < 10000; i++) {
    const TempFoodList: Model.FoodAmount[] = [];
    let tempStd = startStd;
    const RandomFood = randomFoods(PosibleFoods);
    let tempCFToday = childFoodToday;

    while (RandomFood.length != 0) {
      RandomFood.forEach((pf) => {
        const newChildFoodDialy = countDialyFood(
          { FoodDB: pf, amount: 1 },
          tempCFToday,
        );
        const newChildFoodPercentage = countPercentage(
          newChildFoodDialy,
          idealChildFoodDialy,
          false,
        );
        const newStd = stdev(newChildFoodPercentage);

        if (newStd < tempStd && !Overflow(newChildFoodPercentage)) {
          tempStd = newStd;
          tempCFToday = newChildFoodDialy;
          const existFood = TempFoodList.find((fl) => fl.FoodDB.id === pf.id);
          if (existFood) {
            existFood.amount += 1;
          } else {
            TempFoodList.push({ FoodDB: pf, amount: 1 });
          }
          childFoodPercentage = newChildFoodPercentage;
        } else {
          let index = 0;
          while ((index = RandomFood.indexOf(pf)) !== -1) {
            RandomFood.splice(index, 1);
          }
        }
      });
    }
    if (tempStd < std && !Underflow(childFoodPercentage)) {
      std = tempStd;
      FoodList = TempFoodList;
      finalPersentage = childFoodPercentage;
    }
  }
  const mapFood = FoodList.map((fl) => {
    delete fl.FoodDB.id;
    delete fl.FoodDB.foodTypeId;
    return {
      ...fl.FoodDB,
      amount: fl.amount,
    };
  });

  const score = Number((((100 - std) / 100) * 100).toPrecision(4));

  return {
    percentage: finalPersentage,
    score: score < 0 ? 0 : score,
    foodList: mapFood,
  };
};

const Overflow = (persentage: Model.Food) => {
  const value = Object.values(persentage);
  for (const v of value) {
    if (v > 120) {
      return true;
    }
  }
  return false;
};

const Underflow = (persentage: Model.Food) => {
  const value = Object.values(persentage);
  for (const v of value) {
    if (v < 70) {
      return true;
    }
  }
  return false;
};

const randomFoods = (array: FoodDB[]) => {
  const newArr: FoodDB[] = [];
  for (let i = 10; i >= 0; i--) {
    newArr.push(array[Math.floor(Math.random() * array.length)]);
  }
  return newArr;
};

const countDialyFood = (
  childFoodDialy: Model.FoodAmount,
  Food: Model.Food,
): Model.Food => {
  return Object.entries(Food).reduce((newFood, [key, value]) => {
    newFood[key] =
      childFoodDialy["FoodDB"][key] * childFoodDialy["amount"] + value;
    return newFood;
  }, Model.newFoodStats());
};

const countPercentage = (
  childFoodDialy: Model.Food,
  DailyPortion: Static.DailyFood,
  init: boolean,
): Model.Food => {
  return Object.entries(childFoodDialy).reduce((newFood, [key, value]) => {
    if (DailyPortion[key] == 0) {
      newFood[key] = init ? 100 : value * 100;
      return newFood;
    }
    newFood[key] = Number(((value / DailyPortion[key]) * 100).toPrecision(4));
    return newFood;
  }, Model.newFoodStats());
};

const stdev = (Persentage: Model.Food): number => {
  const value = Object.values(Persentage);
  const variance =
    value.reduce((acc, val) => acc + Math.pow(val - 100, 2), 0) / value.length;
  return Math.sqrt(variance);
};
