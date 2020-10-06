import {
  EventProject,
  EventRequest,
  EventTemplateArguments,
} from "../src/models/Event";
import { RecruitmentRequest } from "../src/models/RecruitmentRequest";
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

export const createWithArgsProject = (
  details: EventTemplateArguments
): EventProject => {
  const eventProject = new EventProject(details);
  storage.eventProjects[eventProject.id] = eventProject;
  return eventProject;
};

export const createRecruitmentRequest = (
  reporter: Required<User>
): RecruitmentRequest => {
  const recruitmentRequest = new RecruitmentRequest({
    department: "production",
    description: "asd",
    reporter: reporter.id,
    experience: 3,
    position: "Chef",
  });

  storage.recruitmentRequests[recruitmentRequest.id] = recruitmentRequest;
  return recruitmentRequest;
};
