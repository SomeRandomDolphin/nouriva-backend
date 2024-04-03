import db from "../config/connectDb";
import bcrypt from "bcrypt";
import env from "../config/LoacEnv";
import { ParentRequest } from "../model/ParentModel";
import { CustomError } from "../Utils/ErrorHandling";
import { Prisma } from "@prisma/client";

export const createParent = async (data: ParentRequest) => {
  try {
    const user = await db.parent.create({
      data: {
        name: data.name,
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: bcrypt.hashSync(data.password, env.ROUNDS_SALT),
        reminder: data.reminder,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        reminder: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    if (!user) throw new CustomError(400, "Invalid Data");
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        throw new CustomError(400, "Email Or Username already exist");
      }
    }
    throw error;
  }
};

export const queryParentDetailbyID = async (idInput: number) => {
  const data = await db.parent.findUnique({
    where: {
      id: idInput,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phoneNumber: true,
      reminder: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (!data) throw new CustomError(404, "Parent not found");
  return data;
};

export const queryParentDetailbyUsername = async (usernameInput: string) => {
  const data = await db.parent.findFirst({
    where: {
      username: usernameInput,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phoneNumber: true,
      reminder: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (!data) throw new CustomError(404, "Parent not found");
  return data;
};

export const queryParentDetailbyEmail = async (emailInput: string) => {
  const data = await db.parent.findFirst({
    where: {
      email: emailInput,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      reminder: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  if (!data) throw new CustomError(404, "Parent not found");

  return data;
};

export const editParent = async (parentId: number, data: ParentRequest) => {
  try {
    const parent = await db.parent.update({
      where: {
        id: parentId,
      },
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        reminder: data.reminder,
        phoneNumber: data.phoneNumber,
        password: data.password
          ? bcrypt.hashSync(data.password, env.ROUNDS_SALT)
          : undefined,
      },
    });
    if (!parent) throw new CustomError(400, "Invalid Data");
    return parent;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        throw new CustomError(400, "Email Or Username already exist");
      }
    }
    throw error;
  }
};

export const removeParent = async (parentId: number) => {
  const parent = await db.parent.update({
    where: {
      id: parentId,
    },
    data: {
      deletedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (!parent) throw new CustomError(404, "Parent not found");
  return parent;
};