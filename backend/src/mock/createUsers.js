import storage from "../storage";
import createUser from "../models/user";

export default () => {
  const user = {
    email: "test",
    password: "test",
    type: "customer service",
  };

  storage.users.push(createUser(user));
};
