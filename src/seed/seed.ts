import { randomInt } from "crypto";
import db from "../config/connectDb";
import child from "./ChildSeed";
import { parents } from "./ParentSeed";
import { foodData } from "./FoodSeed";
import { foodTypes } from "./FoodTypeSeed";
import { dailyFoods } from "./DailyFoodSeed";

async function getAllFoodId() {
  return db.food.findMany({
    select: {
      id: true,
    },
  });
}

async function seedParentChild() {
  parents.forEach(async (user) => {
    const parent = await db.parent.findFirst({
      where: {
        email: user.email,
      },
    });

    let id = 0;
    let name = "";

    if (!parent) {
      const data = await db.parent.create({
        data: {
          name: user.name,
          reminder: user.reminder,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNum,
        },
      });
      id = data.id;
      name = data.name;
    } else {
      id = parent.id;
      name = parent.name;
    }

    console.log(`success insert/update parent ${name}`);

    child(id).forEach(async (c) => {
      const { id } = await db.child.create({
        data: {
          name: c.name,
          height: c.height,
          weight: c.weight,
          birthDate: c.birthdate,
          parentId: c.parent_id,
        },
      });
      console.log(`success insert child ${c.name}`);

      // get all food and select random id
      const foods_id = await getAllFoodId();
      const random_food_id =
        foods_id[Math.floor(Math.random() * foods_id.length)].id;

      await db.childFood.create({
        data: {
          childId: id,
          amount: randomInt(10, 100),
          foodId: random_food_id,
          mealTime: new Date(),
        },
      });
      console.log(`success insert child food ${c.name}`);
    });
  });
}

async function seedFood() {
  foodTypes.forEach(async (ft) => {
    await db.foodType.create({
      data: {
        name: ft.name,
      },
    });
    console.log(`success insert food type ${ft.name}`);
  });

  foodData.forEach(async (f) => {
    await db.food.create({
      data: {
        name: f.name,
        water: f.water,
        energy: f.energy,
        carbohydrate: f.carbohydrate,
        protein: f.protein,
        fat: f.fat,
        fibre: f.fibre,
        foodTypeId: f.foodTypeId,
      },
    });
    console.log(`success insert food ${f.name}`);
  });
}

async function seedDailyFood() {
  dailyFoods.forEach(async (df) => {
    await db.dailyFood.create({
      data: {
        water: df.water,
        energy: df.energy,
        carbohydrate: df.carbohydrate,
        protein: df.protein,
        fat: df.fat,
        fibre: df.fibre,
        minAge: df.minAge,
        maxAge: df.maxAge,
      },
    });
    console.log(`success insert daily food ${df.id}`);
  });
}

async function main() {
  try {
    // seedUsers();
    seedFood();
    seedDailyFood();
    seedParentChild();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
