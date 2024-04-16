import { Prisma } from "@prisma/client";
import db from "../config/connectDb";
import { IntakeRequest, UpdateIntake } from "../model/IntakeModel";
import { CustomError } from "../Utils/ErrorHandling";
import { StatusCodes } from "http-status-codes";

export const createIntake = async (intake: IntakeRequest) => {
  try {
    const data = await db.childFood.create({
      data: {
        ...intake,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        // error foriegn key constraint
        throw new CustomError(StatusCodes.NOT_FOUND, "Food not found");
      }
    }
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal server error",
    );
  }
};

export const queryIntakeChildId = async (
  idInput: number,
  start: Date,
  end: Date,
) => {
  const data = await db.childFood.findMany({
    where: {
      childId: idInput,
      mealTime: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      mealTime: "asc",
    },
  });
  if (data.length === 0)
    throw new CustomError(StatusCodes.NOT_FOUND, "Child Food not found");

  return data;
};

export const intakeValidation = async (parentId: number, intake_id: number) => {
  const intake = await db.childFood.findFirst({
    where: {
      id: intake_id,
    },
  });
  if (!intake)
    throw new CustomError(StatusCodes.NOT_FOUND, "Child Food not found");

  const child = await db.child.findFirst({
    where: {
      id: intake.childId,
      parentId: parentId,
    },
  });
  if (!child) throw new CustomError(StatusCodes.NOT_FOUND, "Child not found");

  return intake;
};

export const childIntakeValidation = async (
  childId: number,
  parent_id: number,
) => {
  const child = await db.child.findFirst({
    where: {
      id: childId,
      parentId: parent_id,
    },
  });
  if (!child) throw new CustomError(StatusCodes.NOT_FOUND, "Child not found");
  return child;
};

export const updateIntake = async (id: number, intake: UpdateIntake) => {
  const data = await db.childFood.update({
    where: {
      id: id,
    },
    data: {
      ...intake,
    },
  });
  if (!data) throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Request");
  return data;
};

export const deleteIntake = async (id: number) => {
  const data = await db.childFood.delete({
    where: {
      id: id,
    },
  });
  if (!data) throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Request");
  return data;
};
