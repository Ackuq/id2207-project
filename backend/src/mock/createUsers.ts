import storage from "../storage";
import createUser from "../models/user";
import role from "../utils/role";

export default (): void => {
  const users = [
    {
      email: "customerservice@test.se",
      password: "password",
      type: role.customerService,
      name: "CSTM1",
    },
    {
      email: "customerservice2@test.se",
      password: "password",
      type: role.customerService,
      name: "CSTM2",
    },
    {
      email: "scs@test.se",
      password: "password",
      type: role.seniorCustomerService,
      name: "SCS",
    },
    {
      email: "admin@test.se",
      password: "password",
      type: role.administrationManager,
      name: "Admin",
    },
    {
      email: "financial@test.se",
      password: "password",
      type: role.financialManager,
      name: "Financial",
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
