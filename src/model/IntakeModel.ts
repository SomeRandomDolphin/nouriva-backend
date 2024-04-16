export interface IntakeRequest {
  childId: number;
  foodId: number;
  mealTime: Date;
  amount: number;
}

export interface UpdateIntake {
  mealTime: Date;
  amount: number;
}

export interface IntakeTime {
  start: Date;
  end: Date;
}
export interface IntakeResponse {
  id: number;
  childId: number;
  foodId: number;
  mealTime: Date;
  amount: number;
}

export interface IntakeRetrive {
  date: string;
  mealList: IntakeResponse[];
}
