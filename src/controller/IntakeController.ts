import { Request, Response } from "express";
import Joi from "joi";
import { IntakeRequest, UpdateIntake } from "../model/IntakeModel";
import { intakeSchema, updateIntakeSchema } from "../Utils/Validation";
import { responseData, responseError } from "../Utils/API-Response";
import { UserToken } from "../middleware/AuthMiddleware";
import * as IntakeService from "../service/IntakeService";
import { StatusCodes } from "http-status-codes";

export const createIntake = async (req: Request, res: Response) => {
  const { error, value }: { error: Joi.ValidationError; value: IntakeRequest } =
    intakeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }
  try {
    const { id } = (req as UserToken).user;
    const data = await IntakeService.createIntake(id, value);
    responseData(
      res,
      StatusCodes.CREATED,
      "Child Food Created Successfully",
      data,
    );
  } catch (error) {
    responseError(res, error);
  }
};

export const getIntakeByChild = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const child_id = Number(req.params.child_id);
    const data = await IntakeService.retriveChildFood(child_id, id);

    responseData(res, StatusCodes.OK, "Child Food Retrive Successfully", data);
  } catch (error) {
    responseError(res, error);
  }
};

export const updateIntakeChild = async (req: Request, res: Response) => {
  const { error, value }: { error: Joi.ValidationError; value: UpdateIntake } =
    updateIntakeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const { id } = (req as UserToken).user;
    const intake_id = Number(req.params.intake_id);
    const data = await IntakeService.updateIntake(intake_id, id, value);
    responseData(res, StatusCodes.OK, "Child Food Successfully Updated", data);
  } catch (error) {
    responseError(res, error);
  }
};

export const delateIntakeChild = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const intake_id = Number(req.params.intake_id);
    const data = await IntakeService.deleteIntake(intake_id, id);
    responseData(res, StatusCodes.OK, "Child Food Successfully Deleted", data);
  } catch (error) {
    responseError(res, error);
  }
};
