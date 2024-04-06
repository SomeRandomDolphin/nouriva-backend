import { IntakeRequest, UpdateIntake } from "../model/IntakeModel";
import * as IntakeRepo from "../repository/IntakeRepository";
import { queryParentDetailbyUsername } from "../repository/ParentRepository";

export const createIntake = async (
  parentUsername: string,
  intake: IntakeRequest,
) => {
  /*
   *
   * validasi bahwa parent yang melakukan intake adalah parent yang memiliki child tersebut
   */
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.childIntakeValidation(intake.childId, id);

  const data = await IntakeRepo.createIntake(intake);
  return data;
};

export const retriveChildFood = async (
  child_id: number,
  parentUsername: string,
) => {
  /*
   *
   * validasi bahwa parent yang retrive data adalah parent yang memiliki child tersebut
   */
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.childIntakeValidation(child_id, id);

  return await IntakeRepo.queryIntakeChildId(child_id);
};

export const updateIntake = async (
  intake_id: number,
  parentUsername: string,
  intake: UpdateIntake,
) => {
  /*
   *
   * validasi bahwa parent update Intake adalah parent yang memiliki child tersebut
   * dan child food tersebut adalah milik child tersebut
   */
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.intakeValidation(id, intake_id);

  return await IntakeRepo.updateIntake(intake_id, intake);
};

export const deleteIntake = async (
  intake_id: number,
  parentUsername: string,
) => {
  /*
   *
   * validasi bahwa parent yang delete Intake adalah parent yang memiliki child tersebut
   * dan child food tersebut adalah milik child tersebut
   */
  const { id } = await queryParentDetailbyUsername(parentUsername);
  await IntakeRepo.intakeValidation(id, intake_id);

  return await IntakeRepo.deleteIntake(intake_id);
};
