import { CustomError } from "../Utils/ErrorHandling";
import db from "../config/connectDb";
import { RequestChild } from "../model/ChildModel";

export const queryChildsByParentId = async (id: number) => {
  const data = db.child.findMany({
    where: {
      parentId: id,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      birthDate: true,
      parentId: true,
      height: true,
      weight: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (!data) throw new CustomError(404, "Child not found");
  return data;
};

export const queryCheckChildParent = async (
  parent_id: number,
  childId: number,
) => {
  const data = db.child.findFirst({
    where: {
      parentId: parent_id,
      id: childId,
    },
  });

  if (!data) throw new CustomError(404, "Child not found");
  return data;
};

export const queryChildDetailById = async (childId: number) => {
  const data = db.child.findUnique({
    where: {
      id: childId,
    },
    select: {
      id: true,
      name: true,
      birthDate: true,
      height: true,
      weight: true,
      parentId: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  if (!data) throw new CustomError(404, "Child not found");
  return data;
};

export const createChildRepo = async (id: number, data: RequestChild) => {
  return await db.child.create({
    data: {
      ...data,
      parentId: id,
    },
  });
};

export const editChildRepo = async (childId: number, data: RequestChild) => {
  return await db.child.update({
    where: {
      id: childId,
    },
    data: {
      ...data,
    },
  });
};

export const removeChildRepo = async (childId: number) => {
  return await db.child.update({
    where: {
      id: childId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
