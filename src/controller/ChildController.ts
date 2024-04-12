import { Request, Response } from "express";
import { UserToken } from "../middleware/AuthMiddleware";
import * as ChildService from "../service/ChildService";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import { childSchema } from "../Utils/Validation";
import Joi from "joi";
import { RequestChild } from "../model/ChildModel";

export const retriveParentChilds = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const data = await ChildService.retriveParentChilds(id);
    responseData(res, StatusCodes.OK, "Childs Retrieved", data);
  } catch (error) {
    responseError(res, error);
  }
};

export const registerChild = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;

    const {
      error,
      value,
    }: { error: Joi.ValidationError; value: RequestChild } =
      childSchema.validate(req.body, { abortEarly: false });

    if (error) {
      throw error;
    }

    const data = await ChildService.createChild(id, value);
    responseData(
      res,
      StatusCodes.CREATED,
      "Child Registration Successful",
      data,
    );
  } catch (error) {
    responseError(res, error);
  }
};

export const retriveChildDetail = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const childId = Number(req.params.child_id);
    const data = await ChildService.retriveChildDetail(id, childId);
    responseData(res, StatusCodes.OK, "Child Retrieved", data);
  } catch (error) {
    responseError(res, error);
  }
};

export const updateChild = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const childId = Number(req.params.child_id);

    const {
      error,
      value,
    }: { error: Joi.ValidationError; value: RequestChild } =
      childSchema.validate(req.body, { abortEarly: false });

    if (error) {
      throw error;
    }

    const data = await ChildService.editChildService(id, childId, value);
    responseData(res, StatusCodes.OK, "Child Updated", data);
  } catch (error) {
    responseError(res, error);
  }
};

export const deleteChild = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const childId = Number(req.params.child_id);

    const data = await ChildService.deleteChild(id, childId);

    responseData(res, StatusCodes.OK, "Child Deleted", data);
  } catch (error) {
    responseError(res, error);
  }
};
