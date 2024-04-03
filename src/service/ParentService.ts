import { StatusCodes } from "http-status-codes";
import { ParentRequest } from "../model/ParentModel";
import {
  createParent,
  editParent,
  queryParentDetailbyID,
  queryParentDetailbyUsername,
  removeParent,
} from "../repository/ParentRepository";
import { CustomError } from "../Utils/ErrorHandling";

export const registerParent = async (data: ParentRequest) => {
  return await createParent(data);
};

export const retrieveParent = async (data: number) => {
  const parent = await queryParentDetailbyID(data);
  if (parent.deletedAt) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Parent not found");
  }
  return parent;
};

export const updateParent = async (username: string, data: ParentRequest) => {
  const parent = await queryParentDetailbyUsername(username);

  if (parent.deletedAt) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Parent not found");
  }

  return await editParent(parent.id, data);
};

export const deleteParent = async (username: string) => {
  const parent = await queryParentDetailbyUsername(username);
  if (parent.deletedAt) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Parent already deleted");
  }
  return await removeParent(parent.id);
};
