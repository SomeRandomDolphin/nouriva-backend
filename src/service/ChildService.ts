import { CustomError } from "../Utils/ErrorHandling";
import { RequestChild } from "../model/ChildModel";
import { queryParentById } from "../repository/AuthRepository";
import * as ChildRepo from "../repository/ChildRepository";

export const retriveParentChilds = async (id: number) => {
  const parent = await queryParentById(id);
  if (parent.deletedAt) throw new CustomError(404, "Parent not found");

  const data = await ChildRepo.queryChildsByParentId(id);
  return data.filter((child) => child.deletedAt === null);
};

export const retriveChildDetail = async (id: number, childId: number) => {
  const parent = await queryParentById(id);
  if (parent.deletedAt) throw new CustomError(404, "Parent not found");

  const data = await ChildRepo.queryChildsByParentId(id);
  const child = data.find((child) => child.id === childId && !child.deletedAt);
  if (!child) throw new CustomError(404, "Child not found");
  return child;
};

export const createChild = async (id: number, data: RequestChild) => {
  const parent = await queryParentById(id);
  if (parent.deletedAt) throw new CustomError(404, "Parent not found");

  return await ChildRepo.createChildRepo(id, data);
};

export const editChildService = async (
  id: number,
  childId: number,
  data: RequestChild,
) => {
  const parent = await queryParentById(id);
  if (parent.deletedAt) throw new CustomError(404, "Parent not found");

  const childs = await ChildRepo.queryChildsByParentId(id);

  const child = childs.find(
    (child) => child.id === childId && !child.deletedAt,
  );

  if (!child) throw new CustomError(404, "Child not found");

  return await ChildRepo.editChildRepo(childId, data);
};

export const deleteChild = async (id: number, childId: number) => {
  const parent = await queryParentById(id);
  if (parent.deletedAt) throw new CustomError(404, "Parent not found");

  const childs = await ChildRepo.queryChildsByParentId(id);

  const child = childs.find((child) => child.id === childId);

  if (!child) throw new CustomError(404, "Child not found");

  if (child.deletedAt) throw new CustomError(404, "Child already deleted");

  return await ChildRepo.removeChildRepo(childId);
};
