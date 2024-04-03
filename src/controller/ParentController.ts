import { Request, Response } from "express";
import { parentSchema } from "../Utils/Validation";
import Joi from "joi";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as ParentService from "../service/ParentService";
import { UserToken } from "../middleware/AuthMiddleware";
import { ParentRequest } from "../model/ParentModel";

export const registerParent = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: ParentRequest;
  } = parentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const user = await ParentService.registerParent(value);
    responseData(res, StatusCodes.OK, "Parent Registration Successful", user);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrieveParent = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.parent_id);
    const url = await ParentService.retrieveParent(value);
    responseData(res, StatusCodes.OK, "Parent Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};

export const updateParent = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: ParentRequest;
  } = parentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const { username } = (req as UserToken).user;
    const updatedUser = await ParentService.updateParent(username, value);
    responseData(
      res,
      StatusCodes.OK,
      "Parent Updated Successfully",
      updatedUser,
    );
  } catch (err) {
    responseError(res, err);
  }
};

export const deleteParent = async (req: Request, res: Response) => {
  try {
    const { username } = (req as UserToken).user;
    const url = await ParentService.deleteParent(username);
    responseData(res, StatusCodes.OK, "Parent Deleted Successfully", url);
  } catch (err) {
    responseError(res, err);
  }
};
