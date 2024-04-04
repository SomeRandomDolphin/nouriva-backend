import { IntakeRequest, UpdateIntake } from "../model/IntakeModel";
import * as IntakeRepo from "../repository/IntakeRepository";
import { queryParentDetailbyUsername } from "../repository/ParentRepository";

export const createIntake = async (
  parentUsername: string,
  intake: IntakeRequest,
) => {
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.childIntakeValidation(intake.childId, id);
  const data = await IntakeRepo.createIntake(intake);
  return data;
};

export const retriveChildFood = async (
  child_id: number,
  parentUsername: string,
) => {
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.childIntakeValidation(child_id, id);

  return await IntakeRepo.queryIntakeChildId(child_id);
};

export const updateIntake = async (
  intake_id: number,
  parentUsername: string,
  intake: UpdateIntake,
) => {
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.intakeValidation(id, intake_id);
  return await IntakeRepo.updateIntake(intake_id, intake);
};

export const deleteIntake = async (
  intake_id: number,
  parentUsername: string,
) => {
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.intakeValidation(id, intake_id);
  return await IntakeRepo.deleteIntake(intake_id);
};
