import storage from "../storage";
import createUser from "../models/user";
import role from "../utils/role";

export default (): void => {
  const users = [
    {
      email: "customerservice@test.se",
      password: "password",
      type: role.customerService,
    },
    {
      email: "scs@test.se",
      password: "password",
      type: role.seniorCustomerService,
    },
  ];
  users;
  try {
    users.forEach((user) => {
      storage.users.push(createUser(user));
    });
  } catch (e) {
    console.error(e);
  }
};
