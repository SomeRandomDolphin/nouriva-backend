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
