import { Request, Response } from "express";
import { loginSchema } from "../Utils/Validation";
import Joi from "joi";
import { LoginRequest } from "../model/AuthModel";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as AuthService from "../service/AuthService";
import { UserToken } from "../middleware/AuthMiddleware";

export const loginParent = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: LoginRequest;
  } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const tokens = await AuthService.loginParent(value);
    responseData(res, StatusCodes.OK, "Login Successful", tokens);
  } catch (err) {
    responseError(res, err);
  }
};

export const getParentProfile = async (req: Request, res: Response) => {
  const { id } = (req as UserToken).user;

  try {
    const data = await AuthService.ParentProfile(id);
    responseData(res, StatusCodes.OK, "Profile Retrieved Successfully", data);
  } catch (err) {
    responseError(res, err);
  }
};
