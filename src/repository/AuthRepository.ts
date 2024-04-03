import db from "../config/connectDb";

export const queryParentById = async (parentId: number) => {
  return await db.parent.findUnique({
    where: {
      id: parentId,
    },
  });
};

export const queryParentByEmail = async (email: string) => {
  return await db.parent.findFirst({
    where: {
      email: email,
    },
  });
};

export const queryParentByUsername = async (username: string) => {
  return await db.parent.findFirst({
    where: {
      username: username,
    },
  });
};
