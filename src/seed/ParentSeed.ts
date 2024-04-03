import bcrypt from "bcrypt";
import env from "../config/LoacEnv";

const genSalt = bcrypt.genSaltSync(env.ROUNDS_SALT);

interface Parents {
  name: string;
  username: string;
  email: string;
  phoneNum: string;
  reminder: boolean;
  password: string;
}

export const parents: Parents[] = [
  {
    name: "Gesang Gey",
    username: "gesanggey",
    email: "gesanggey@gmail.com",
    phoneNum: "081231231231",
    password: bcrypt.hashSync("gesanggey", genSalt),
    reminder: true,
  },
  {
    name: "Ivan Wibu",
    username: "ivanwibu",
    email: "ivanwibu@gmail.com",
    phoneNum: "0822312212233",
    password: bcrypt.hashSync("ivanwibu", genSalt),
    reminder: true,
  },
  {
    name: "Rio Gans",
    username: "riogans",
    email: "riogans@gmail.com",
    phoneNum: "0812313323422",
    password: bcrypt.hashSync("riogans", genSalt),
    reminder: true,
  },
];
