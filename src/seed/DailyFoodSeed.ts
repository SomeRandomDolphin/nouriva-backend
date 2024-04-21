interface DailyFood {
  id: number;
  water: number;
  energy: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  fibre: number;
  minAge: number;
  maxAge: number;
}

export const dailyFoods: DailyFood[] = [
  {
    id: 1,
    water: 700,
    energy: 550,
    carbohydrate: 59,
    protein: 9,
    fat: 31,
    fibre: 0,
    minAge: 0,
    maxAge: 5,
  },
  {
    id: 2,
    water: 900,
    energy: 800,
    carbohydrate: 105,
    protein: 15,
    fat: 35,
    fibre: 11,
    minAge: 6,
    maxAge: 11,
  },
  {
    id: 3,
    water: 1150,
    energy: 1350,
    carbohydrate: 215,
    protein: 20,
    fat: 45,
    fibre: 19,
    minAge: 12,
    maxAge: 36,
  },
  {
    id: 4,
    water: 1450,
    energy: 1400,
    carbohydrate: 220,
    protein: 25,
    fat: 50,
    fibre: 20,
    minAge: 37,
    maxAge: 60,
  },
];
