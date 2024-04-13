export interface DailyFood {
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

export interface ChildDialyFood {
  water: number;
  energy: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  fibre: number;
}

export interface Persentage {
  fibreP: number;
  fatP: number;
  waterP: number;
  energyP: number;
  carbohydrateP: number;
  proteinP: number;
}

export interface Food {
  id: number;
  name: string;
  water: number;
  energy: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  fibre: number;
  foodTypeId: number;
}

export interface IdealFoodConsumption {
  fat: {
    min: number;
    max: number;
  };
  fibre: {
    min: number;
    max: number;
  };
  water: {
    min: number;
    max: number;
  };
  energy: {
    min: number;
    max: number;
  };
  carbohydrate: {
    min: number;
    max: number;
  };
  protein: {
    min: number;
    max: number;
  };
}

export const newChildDailyFoods = (): ChildDialyFood => {
  return {
    water: 0,
    energy: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    fibre: 0,
  };
};

export const newPercentage = (): Persentage => {
  return {
    fibreP: 0,
    fatP: 0,
    waterP: 0,
    energyP: 0,
    carbohydrateP: 0,
    proteinP: 0,
  };
};

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
