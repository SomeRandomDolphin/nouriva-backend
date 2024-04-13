import { newChildDailyFoods } from "../public/StaticData";
import {
  queryFoodDetailbyID,
  queryFoodDetailAll,
  queryFoodWithFoodType,
  queryChildFoodToday,
  queryChildAge,
  queryAllNeededFood,
} from "../repository/FoodRepository";

import * as Static from "../public/StaticData";

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

export const foodsRecommendation = async (childId: number) => {
  const foodsRecomendation: Static.Food[] = [];

  const ChildMealToday = await queryChildFoodToday(childId);
  let childFoodToday = newChildDailyFoods();
  const childAge = await queryChildAge(childId);
  const idealChildFoodDialy = Static.dailyFoods.find(
    (df) => childAge >= df.minAge && childAge <= df.maxAge,
  );

  ChildMealToday.forEach(async (cf) => {
    const food = await queryFoodDetailbyID(cf.foodId);
    childFoodToday = countChildDialy(childFoodToday, food);
  });

  const childFoodPercentage = countPercentage(
    childFoodToday,
    idealChildFoodDialy,
  );

  const idealCons = idealConsumption(idealChildFoodDialy, childFoodPercentage);

  let standartDeviation = standartDeviationPersentage(childFoodPercentage);

  const sortedKey = Object.keys(childFoodPercentage).sort((a, b) => {
    return childFoodPercentage[a] - childFoodPercentage[b];
  });

  const PosibleFood = await queryAllNeededFood(sortedKey, idealCons);

  PosibleFood.forEach((pf) => {
    const newChildFoodDialy = countChildDialy(childFoodToday, pf);
    const newChildFoodPercentage = countPercentage(
      newChildFoodDialy,
      idealChildFoodDialy,
    );

    const newStd = standartDeviationPersentage(newChildFoodPercentage);

    if (newStd <= standartDeviation) {
      standartDeviation = newStd;
      childFoodToday = newChildFoodDialy;
      foodsRecomendation.push(pf);
    }
  });

  return foodsRecomendation;
};

//

const countChildDialy = (
  childFoodDialy: Static.ChildDialyFood,
  Food: Static.Food,
): Static.ChildDialyFood => {
  return {
    fat: childFoodDialy.fat + Food.fat,
    fibre: childFoodDialy.fibre + Food.fibre,
    protein: childFoodDialy.protein + Food.protein,
    water: childFoodDialy.water + Food.water,
    energy: childFoodDialy.energy + Food.energy,
    carbohydrate: childFoodDialy.carbohydrate + Food.carbohydrate,
  };
};

const countPercentage = (
  childFoodDialy: Static.ChildDialyFood,
  DialyPortion: Static.ChildDialyFood,
) => {
  return {
    fatP: (childFoodDialy.fat / DialyPortion.fat) * 100,
    fibreP: (childFoodDialy.fibre / DialyPortion.fibre) * 100,
    proteinP: (childFoodDialy.protein / DialyPortion.protein) * 100,
    waterP: (childFoodDialy.water / DialyPortion.water) * 100,
    energyP: (childFoodDialy.energy / DialyPortion.energy) * 100,
    carbohydrateP:
      (childFoodDialy.carbohydrate / DialyPortion.carbohydrate) * 100,
  };
};

const standartDeviationPersentage = (Persentage: Static.Persentage): number => {
  return (
    Math.sqrt(
      Math.pow(Persentage.fatP - 100, 2) +
        Math.pow(Persentage.fibreP - 100, 2) +
        Math.pow(Persentage.proteinP - 100, 2) +
        Math.pow(Persentage.waterP - 100, 2) +
        Math.pow(Persentage.energyP - 100, 2) +
        Math.pow(Persentage.carbohydrateP - 100, 2),
    ) / 6
  );
};

const idealConsumption = (
  Dialy: Static.DailyFood,
  Persentage: Static.Persentage,
): Static.IdealFoodConsumption => {
  return {
    fat: {
      min: ((100 - Persentage.fatP - 10) * Dialy.fat) / 100,
      max: ((100 - Persentage.fatP + 10) * Dialy.fat) / 100,
    },
    energy: {
      min: ((100 - Persentage.energyP - 10) * Dialy.energy) / 100,
      max: ((100 - Persentage.energyP + 10) * Dialy.energy) / 100,
    },
    water: {
      min: ((100 - Persentage.waterP - 10) * Dialy.water) / 100,
      max: ((100 - Persentage.waterP + 10) * Dialy.water) / 100,
    },
    carbohydrate: {
      min: ((100 - Persentage.carbohydrateP - 20) * Dialy.carbohydrate) / 100,
      max: ((100 - Persentage.carbohydrateP + 10) * Dialy.carbohydrate) / 100,
    },
    protein: {
      min: ((100 - Persentage.proteinP - 10) * Dialy.protein) / 100,
      max: ((100 - Persentage.proteinP + 10) * Dialy.protein) / 100,
    },
    fibre: {
      min: ((100 - Persentage.fibreP - 10) * Dialy.fibre) / 100,
      max: ((100 - Persentage.fibreP + 10) * Dialy.fibre) / 100,
    },
  };
};

// const newFoodPercentage = (
//   foods: Static.Food[],
//   foodDialy: Static.ChildDialyFood,
//   ideal: Static.DailyFood,
// ) => {
//   let standartDeviation = Number.MAX_VALUE;
//   let Percentage = Static.newPercentage();
//   let DialyFood = newChildDailyFoods();
//   let food: Static.Food;

//   foods.forEach((f) => {
//     const newChildFoodDialy = countChildDialy(foodDialy, f);
//     const newChildFoodPercentage = countPercentage(newChildFoodDialy, ideal);
//     const newStandartDeviation = standartDeviationPersentage(
//       newChildFoodPercentage,
//     );
//     if (newStandartDeviation < standartDeviation) {
//       standartDeviation = newStandartDeviation;
//       Percentage = newChildFoodPercentage;
//       DialyFood = newChildFoodDialy;
//       food = f;
//     }
//   });
//   return {
//     percentage: Percentage,
//     dialyFood: DialyFood,
//     food: food,
//   };
// };

// export const foodRecommendation = async (childId: number) => {
//   const foodsRecomendation: Static.Food[] = [];
//   const childAge = await queryChildAge(childId);
//   const childFoodsToday = await queryChildFoodToday(childId);
//   let childFoodDialy = newChildDailyFoods();
//   let childFoodPercentage = Static.newPercentage();
//   const idealChildFoodDialy = Static.dailyFoods.find(
//     (df) => childAge >= df.minAge && childAge <= df.maxAge,
//   );
//   childFoodsToday.forEach(async (cf) => {
//     const foodInfo = await queryFoodDetailbyID(cf.foodId);
//     childFoodDialy = countChildDialy(childFoodDialy, foodInfo);
//   });
//   childFoodPercentage = countPercentage(childFoodDialy, idealChildFoodDialy);
//   const idealCons = idealConsumption(idealChildFoodDialy, childFoodPercentage);

//   // fat
//   if (childFoodPercentage.fatP <= 50) {
//     const findFat = await queryFat(idealCons.fat.min, idealCons.fat.max);
//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findFat,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );
//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }

//   // fiber
//   if (childFoodPercentage.fibreP <= 50) {
//     const findFibre = await queryFibre(
//       idealCons.fibre.min,
//       idealCons.fibre.max,
//     );

//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findFibre,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );

//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }

//   // protein

//   if (childFoodPercentage.proteinP <= 50) {
//     const findProtein = await queryProtein(
//       idealCons.protein.min,
//       idealCons.protein.max,
//     );

//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findProtein,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );

//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }

//   // carbohydrate

//   if (childFoodPercentage.carbohydrateP <= 50) {
//     const findCarbohydrate = await queryCarbohydrate(
//       idealCons.carbohydrate.min,
//       idealCons.carbohydrate.max,
//     );

//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findCarbohydrate,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );

//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }

//   // water

//   if (childFoodPercentage.waterP <= 50) {
//     const findWater = await queryWater(
//       idealCons.water.min,
//       idealCons.water.max,
//     );

//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findWater,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );
//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }

//   // energy

//   if (childFoodPercentage.energyP <= 50) {
//     const findEnergy = await queryEnergy(
//       idealCons.energy.min,
//       idealCons.energy.max,
//     );
//     const { percentage, dialyFood, food } = newFoodPercentage(
//       findEnergy,
//       childFoodDialy,
//       idealChildFoodDialy,
//     );

//     childFoodPercentage = percentage;
//     childFoodDialy = dialyFood;
//     foodsRecomendation.push(food);
//   }
//   return foodsRecomendation;
// };
