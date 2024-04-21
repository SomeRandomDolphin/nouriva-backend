import { randomInt } from "crypto";
import db from "../config/connectDb";
import child from "./ChildSeed";
import { parents } from "./ParentSeed";
import { foodData } from "./FoodSeed";
import { foodTypes } from "./FoodTypeSeed";

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
          amount: randomInt(1, 10),
          foodId: random_food_id,
          mealTime: new Date(),
        },
      });
      console.log(`success insert child food ${c.name}`);
    });
  });
}

async function seedFoodType() {
  return Promise.all(foodTypes.map(async (ft) => {
    await db.foodType.create({ 
      data: { 
        id: ft.id, 
        name: ft.name 
      } 
    });
    console.log(`success insert food type ${ft.name}`);
  }));
}

async function seedFood() {
  return Promise.all(foodData.map(async (f) => {
    await db.food.create({
      data: {
        id: f.id,
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
  }));
}

async function main() {
  try {
    await Promise.all([seedFoodType()]);
    await Promise.all([seedFood()]);
    await Promise.all([seedParentChild()]);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
