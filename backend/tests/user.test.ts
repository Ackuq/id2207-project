import { handleLogin } from "../src/handlers/auth";
import { UserParams, CustomerService } from "../src/models/user";
import addUser from "../src/utils/addUser";
import role from "../src/utils/role";

test("login user", () => {
  const userDetails: UserParams = {
    name: "John Doe",
    email: "john@doe.se",
    type: role.customerService,
    password: "password",
  };

  addUser(userDetails);

  const { accessToken, user } = handleLogin(
    userDetails.email,
    userDetails.password
  );

  expect(user).toBeInstanceOf(CustomerService);
  expect(user.email).toBe(userDetails.email);
  expect(user.role).toBe(userDetails.type);
  expect(user.name).toBe(userDetails.name);
  expect(user.password).toBe(userDetails.password);

  expect(accessToken).toBeDefined();
});
