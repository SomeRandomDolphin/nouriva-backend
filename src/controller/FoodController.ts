import { Request, Response } from "express";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as FoodService from "../service/FoodService";
import { UserToken } from "../middleware/AuthMiddleware";
import { StatReq } from "../model/FoodModel";
import { statSchema } from "../Utils/Validation";
import Joi from "joi";

export const retrieveFoodbyID = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.food_id);
    const url = await FoodService.retrieveFoodbyID(value);
    responseData(res, StatusCodes.OK, "Food Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrieveFoodAll = async (req: Request, res: Response) => {
  try {
    const url = await FoodService.retrieveFoodAll();
    responseData(res, StatusCodes.OK, "Food Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};

export const retriveFoodCategory = async (req: Request, res: Response) => {
  try {
    console.log("apa ini king");
    const data = await FoodService.retriveFoodCategory();
    responseData(res, StatusCodes.OK, "Food Category Retrieved", data);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrieveFoodWithFoodType = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.food_type_id);
    const url = await FoodService.retrieveFoodWithFoodType(value);
    responseData(res, StatusCodes.OK, "Food Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};

export const foodsRecommendation = async (req: Request, res: Response) => {
  try {
    const { id } = (req as UserToken).user;
    const { child_id } = req.params;

    const dataRec = await FoodService.foodsRecommendation(id, Number(child_id));

    responseData(res, StatusCodes.OK, "Food Recommendation", dataRec);
  } catch (error) {
    responseError(res, error);
  }
};

export const childFoodStatistic = async (req: Request, res: Response) => {
  const { error, value }: { error: Joi.ValidationError; value: StatReq } =
    statSchema.validate(req.query, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const { child_id } = req.params;
    const { id } = (req as UserToken).user;
    const data = await FoodService.retrieveChildFoodStatisic(
      id,
      Number(child_id),
      value,
    );
    responseData(res, StatusCodes.OK, "Food Stats", data);
  } catch (error) {
    responseError(res, error);
  }
};
