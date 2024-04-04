import { CustomError } from "../Utils/ErrorHandling";
import { RequestChild } from "../model/ChildModel";
import {
  createChildRepo,
  editChildRepo,
  queryChildsByParentUsername,
  removeChildRepo,
} from "../repository/ChildRepository";

export const retriveParentChilds = async (parentUsername: string) => {
  const data = await queryChildsByParentUsername(parentUsername);
  return data.filter((child) => child.deletedAt === null);
};

export const retriveChildDetail = async (
  parentUsername: string,
  childId: number,
) => {
  const data = await queryChildsByParentUsername(parentUsername);
  const child = data.find((child) => child.id === childId && !child.deletedAt);
  if (!child) throw new CustomError(404, "Child not found");
  return child;
};

export const createChild = async (
  parentUsername: string,
  data: RequestChild,
) => {
  return await createChildRepo(parentUsername, data);
};

export const editChildService = async (
  parentUsername: string,
  childId: number,
  data: RequestChild,
) => {
  const childs = await queryChildsByParentUsername(parentUsername);

  const child = childs.find(
    (child) => child.id === childId && !child.deletedAt,
  );

  if (!child) throw new CustomError(404, "Child not found");

  return await editChildRepo(childId, data);
};

export const deleteChild = async (parentUsername: string, childId: number) => {
  const childs = await queryChildsByParentUsername(parentUsername);

  const child = childs.find((child) => child.id === childId);

  if (!child) throw new CustomError(404, "Child not found");

  if (child.deletedAt) throw new CustomError(404, "Child already deleted");

  return await removeChildRepo(childId);
};
