import { v4 as uuidv4 } from "uuid";
import * as views from "../utils/views";
import role from "../utils/role";

export interface UserParams {
  email: string;
  password: string;
  type: role;
  name: string;
}

export class User {
  role = role.undefined;
  id;
  email;
  password;
  name;
  constructor(user: UserParams) {
    this.id = uuidv4();
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
  }
}

export class CustomerService extends User {
  views = [views.createEventRequest, views.eventRequests];
  constructor(user: UserParams) {
    super(user);
    this.role = role.customerService;
  }
}

export class SeniorCustomerService extends User {
  views = [views.eventRequests];
  constructor(user: UserParams) {
    super(user);
    this.role = role.seniorCustomerService;
  }
}

export class AdministrationManager extends User {
  views = [views.eventRequests, views.eventProjects];
  constructor(user: UserParams) {
    super(user);
    this.role = role.administrationManager;
  }
}

export class FinancialManager extends User {
  views = [views.eventRequests, views.eventProjects];
  constructor(user: UserParams) {
    super(user);
    this.role = role.financialManager;
  }
}

export class ServiceTeamMember extends User {
  views = [views.tasks];
  constructor(user: UserParams) {
    super(user);
    this.role = role.serviceTeamMember;
  }
}

export class ServiceManager extends User {
  views = [views.tasks, views.eventProjects];
  constructor(user: UserParams) {
    super(user);
    this.role = role.serviceManager;
  }
}

export class ProductionTeamMember extends User {
  views = [views.tasks];
  constructor(user: UserParams) {
    super(user);
    this.role = role.productionTeamMember;
  }
}

export class ProductionManager extends User {
  views = [views.tasks, views.eventProjects];
  constructor(user: UserParams) {
    super(user);
    this.role = role.productionManager;
  }
}

export class HR extends User {
  views = [views.recruitmentRequest];
  constructor(user: UserParams) {
    super(user);
    this.role = role.HR;
  }
}

const userFactory = (user: UserParams): Required<User> => {
  if (user.type === role.customerService) {
    return new CustomerService(user);
  } else if (user.type === role.seniorCustomerService) {
    return new SeniorCustomerService(user);
  } else if (user.type === role.financialManager) {
    return new FinancialManager(user);
  } else if (user.type === role.administrationManager) {
    return new AdministrationManager(user);
  } else if (user.type === role.productionTeamMember) {
    return new ProductionTeamMember(user);
  } else if (user.type === role.productionManager) {
    return new ProductionManager(user);
  } else if (user.type === role.serviceTeamMember) {
    return new ServiceTeamMember(user);
  } else if (user.type === role.serviceManager) {
    return new ServiceManager(user);
  } else if (user.type === role.HR) {
    return new HR(user);
  }
  throw new Error("Invalid user");
};

export default userFactory;
