import { StatusCodes } from "http-status-codes";
import { CustomError } from "../Utils/ErrorHandling";
import { LoginRequest } from "../model/AuthModel";
import {
  queryParentByEmail,
  queryParentById,
} from "../repository/AuthRepository";
import { generateAccessToken } from "../Utils/JWT-Token";
import bcrypt from "bcrypt";

export const loginParent = async (data: LoginRequest) => {
  const parent = await queryParentByEmail(data.email);
  if (!parent) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Credential");
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, parent.password);
  if (!isPasswordMatch) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Credential");
  }

  const payload = {
    id: parent.id,
    email: parent.email,
  };

  const accessToken = generateAccessToken(payload);

  return { accessToken };
};

export const ParentProfile = async (idParent: number) => {
  const parent = await queryParentById(idParent);

  if (!parent) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Invalid Parent");
  }

  delete parent.password;

  return parent;
};
