import { randomInt } from "crypto";
import db from "../config/connectDb";
import child from "./ChildSeed";
import { parents } from "./ParentSeed";

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
          username: user.username,
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

async function main() {
  try {
    seedParentChild();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
