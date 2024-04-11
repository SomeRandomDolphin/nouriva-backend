import { IntakeRequest, UpdateIntake } from "../model/IntakeModel";
import * as IntakeRepo from "../repository/IntakeRepository";

export const createIntake = async (parentid: number, intake: IntakeRequest) => {
  /*
   *
   * validasi bahwa parent yang melakukan intake adalah parent yang memiliki child tersebut
   */
  await IntakeRepo.childIntakeValidation(intake.childId, parentid);

  const data = await IntakeRepo.createIntake(intake);
  return data;
};

export const retriveChildFood = async (child_id: number, parentid: number) => {
  /*
   *
   * validasi bahwa parent yang retrive data adalah parent yang memiliki child tersebut
   */
  await IntakeRepo.childIntakeValidation(child_id, parentid);
  return await IntakeRepo.queryIntakeChildId(child_id);
};

export const updateIntake = async (
  intake_id: number,
  parentid: number,
  intake: UpdateIntake,
) => {
  /*
   *
   * validasi bahwa parent update Intake adalah parent yang memiliki child tersebut
   * dan child food tersebut adalah milik child tersebut
   */
  await IntakeRepo.intakeValidation(parentid, intake_id);

  return await IntakeRepo.updateIntake(intake_id, intake);
};

export const deleteIntake = async (intake_id: number, parentId: number) => {
  /*
   *
   * validasi bahwa parent yang delete Intake adalah parent yang memiliki child tersebut
   * dan child food tersebut adalah milik child tersebut
   */
  await IntakeRepo.intakeValidation(parentId, intake_id);

  return await IntakeRepo.deleteIntake(intake_id);
};
