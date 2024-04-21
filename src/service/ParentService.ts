import { StatusCodes } from "http-status-codes";
import { ParentRequest } from "../model/ParentModel";
import {
  createParent,
  editParent,
  queryParentDeletedAt,
  queryParentDetailbyID,
  removeParent,
} from "../repository/ParentRepository";
import { CustomError } from "../Utils/ErrorHandling";

export const registerParent = async (data: ParentRequest) => {
  return await createParent(data);
};

export const retrieveParent = async (data: number) => {
  const parent = await queryParentDetailbyID(data);
  if (parent.deletedAt) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Parent not found");
  }
  return parent;
};

export const updateParent = async (id: number, data: ParentRequest) => {
  return await editParent(id, data);
};

export const deleteParent = async (id: number) => {
  const parent = await queryParentDeletedAt(id);
  if (parent.deletedAt) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Parent already deleted");
  }
  return await removeParent(id);
};
