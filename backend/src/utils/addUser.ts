import createUser, { User, UserParams } from "../models/User";
import storage from "../storage";

const addUser = (userDetails: UserParams): Required<User> => {
  const user = createUser(userDetails);

  storage.users[user.id] = user;

  return user;
};

export default addUser;
