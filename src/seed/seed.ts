import db from "../config/connectDb";
import child from "./ChildSeed";
import { parents } from "./ParentSeed";

async function seedUsers() {
  parents.forEach(async (user) => {
    const { id, name } = await db.parent.create({
      data: {
        name: user.name,
        username: user.username,
        reminder: user.reminder,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNum,
      },
    });

    console.log(`success insert/update parent ${name}`);

    child(id).forEach(async (c) => {
      await db.child.create({
        data: {
          name: c.name,
          height: c.height,
          weight: c.weight,
          birthDate: c.birthdate,
          parentId: c.parent_id,
        },
      });
      console.log(`success insert child ${c.name}`);
    });
  });
}

async function main() {
  try {
    seedUsers();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
