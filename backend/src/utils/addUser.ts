import createUser, { UserParams } from "../models/user";
import storage from "../storage";

const addUser = (user: UserParams): void => {
  storage.users.push(createUser(user));
};

export default addUser;
