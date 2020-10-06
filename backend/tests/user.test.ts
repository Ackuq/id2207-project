import { handleLogin } from "../src/handlers/Auth";
import { handleGetSubTeam } from "../src/handlers/User";
import { UserParams, CustomerService } from "../src/models/User";
import addUser from "../src/utils/addUser";
import role from "../src/utils/role";
import { createUser } from "../src/utils/helpers";

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

test("get sub team", () => {
  const serviceManager = createUser(role.serviceManager);
  const serviceTM = createUser(role.serviceTeamMember);
  const productionManager = createUser(role.productionManager);
  const productionTM = createUser(role.productionTeamMember);

  expect(handleGetSubTeam(productionManager)).toStrictEqual([productionTM]);
  expect(handleGetSubTeam(serviceManager)).toStrictEqual([serviceTM]);

  expect(() => {
    handleGetSubTeam(serviceTM);
  }).toThrow();
  expect(() => {
    handleGetSubTeam(productionTM);
  }).toThrow();
});
