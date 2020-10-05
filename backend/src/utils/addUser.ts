import createUser, { User, UserParams } from "../models/User";
import storage from "../storage";

const addUser = (userDetails: UserParams): Required<User> => {
  const user = createUser(userDetails);

  storage.users.push(user);

  return user;
};

export default addUser;
