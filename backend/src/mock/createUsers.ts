import storage from "../storage";
import createUser from "../models/User";
import role from "../utils/role";
import { EventRequest, requestStatus } from "../models/Event";
import { handleCreateEventProject } from "../handlers/EventProject";

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
    {
      email: "pm@test.se",
      password: "password",
      type: role.productionManager,
      name: "Production Manager",
    },
    {
      email: "ptm@test.se",
      password: "password",
      type: role.productionTeamMember,
      name: "Production Team Member",
    },
    {
      email: "sm@test.se",
      password: "password",
      type: role.serviceManager,
      name: "Service Manager",
    },
    {
      email: "stm@test.se",
      password: "password",
      type: role.serviceTeamMember,
      name: "Service Team Member",
    },
  ];

  try {
    users.forEach((user) => {
      storage.users.push(createUser(user));
    });
  } catch (e) {
    console.error(e);
  }

  const eventRequest: EventRequest = {
    archived: true,
    budget: 100,
    budgetApproved: true,
    client: "bob",
    date: new Date(),
    description: "Some event",
    id: 1,
    participants: 100,
    reporter:
      storage.users.find((u) => u.role === role.customerService)?.id || "",
    status: requestStatus.approved,
    type: "IT",
  };

  storage.eventRequests.push(eventRequest);

  handleCreateEventProject(eventRequest);
};
