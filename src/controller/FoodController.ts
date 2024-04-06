import { Request, Response } from "express";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as FoodService from "../service/FoodService";

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

export const retrieveFoodWithFoodType = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.food_type_id);
    const url = await FoodService.retrieveFoodWithFoodType(value);
    responseData(res, StatusCodes.OK, "Food Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};
