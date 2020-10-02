import { v4 as uuidv4 } from "uuid";

class User {
  constructor(user) {
    this.id = uuidv4();
    this.email = user.email;
    this.password = user.password;
  }
}

class CustomerService extends User {
  constructor(user) {
    super(user);
    this.role = "customer service";
  }
}

const userFactory = (user) => {
  if (user.type === "customer service") {
    return new CustomerService(user);
  }
  return null;
};

export default userFactory;
