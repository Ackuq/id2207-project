import { EventProject, EventRequest } from "../src/models/Event";
import userFactory, { User } from "../src/models/User";
import storage from "../src/storage";
import role from "../src/utils/role";

export const createUser = (role: role): Required<User> => {
  const user = userFactory({
    email: `${role}@test.se`,
    name: role,
    password: "password",
    type: role,
  });
  storage.users[user.id] = user;
  return user;
};

export const createEventRequest = (reporter: User): EventRequest => {
  const eventRequest = new EventRequest({
    budget: 1000,
    client: "bob",
    date: new Date(),
    description: "",
    participants: 1000,
    reporter: reporter.id,
    type: "test",
  });
  storage.eventRequests[eventRequest.id] = eventRequest;
  return eventRequest;
};

export const createProject = (): EventProject => {
  const eventProject = new EventProject({
    budget: 1000,
    client: "Bob",
    date: new Date(),
    description: "",
    participants: 1000,
    type: "test",
  });
  storage.eventProjects[eventProject.id] = eventProject;
  return eventProject;
};
