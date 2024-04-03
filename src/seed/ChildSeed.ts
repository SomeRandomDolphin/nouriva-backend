import { randomInt } from "crypto";

interface Child {
  name: string;
  birthdate: Date;
  height: number;
  weight: number;
  parent_id: number;
}

const randomName = () => {
  const names = [
    "John",
    "Doe",
    "Jane",
    "Smith",
    "James",
    "Brown",
    "Michael",
    "Johnson",
    "William",
    "Jones",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export default function child(parent_id: number): Child[] {
  return [
    {
      name: randomName(),
      birthdate: new Date("2021-01-01"),
      height: randomInt(50, 120),
      weight: randomInt(2, 17),
      parent_id,
    },
    {
      name: randomName(),
      birthdate: new Date("2021-01-02"),
      height: randomInt(50, 120),
      weight: randomInt(2, 17),
      parent_id,
    },
    {
      name: randomName(),
      birthdate: new Date("2021-01-02"),
      height: randomInt(50, 120),
      weight: randomInt(2, 17),
      parent_id,
    },
  ] as Child[];
}
