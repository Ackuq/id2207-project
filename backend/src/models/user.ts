import { v4 as uuidv4 } from "uuid";
import * as views from "../utils/views";
import role from "../utils/role";

interface UserParams {
  email: string;
  password: string;
  type: role;
}

export class User {
  role = "undefined";
  id;
  email;
  password;
  constructor(user: UserParams) {
    this.id = uuidv4();
    this.email = user.email;
    this.password = user.password;
  }
}

class CustomerService extends User {
  views = [views.createEventRequest, views.eventRequests];
  constructor(user: UserParams) {
    super(user);
    this.role = role.customerService;
  }
}

class SeniorCustomerService extends User {
  views = [views.eventRequests];
  constructor(user: UserParams) {
    super(user);
    this.role = role.seniorCustomerService;
  }
}

const userFactory = (user: UserParams): Required<User> => {
  if (user.type === role.customerService) {
    return new CustomerService(user);
  } else if (user.type === role.seniorCustomerService) {
    return new SeniorCustomerService(user);
  }
  throw new Error("Invalid user");
};

export default userFactory;
