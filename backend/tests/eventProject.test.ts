import {
  handleEditEventProject,
  handleGetEventProject,
  handleGetEventProjects,
} from "../src/handlers/EventProject";
import {
  EventProject,
  eventStatus,
  EventTemplateArguments,
} from "../src/models/Event";
import role from "../src/utils/role";
import { createUser, createWithArgsProject } from "./helpers";

test("create and list event projects", () => {
  const serviceManager = createUser(role.serviceManager);

  // Create event request and check that it is correct
  const projectArgs: EventTemplateArguments = {
    budget: 1000,
    client: "bob",
    date: new Date(),
    description: "Party",
    participants: 10000,
    type: "test",
  };

  const eventProject = createWithArgsProject(projectArgs);

  expect(eventProject).toBeInstanceOf(EventProject);

  expect(eventProject.description).toBe(projectArgs.description);
  expect(eventProject.type).toBe(projectArgs.type);
  expect(eventProject.budget).toBe(projectArgs.budget);
  expect(eventProject.client).toBe(projectArgs.client);
  expect(eventProject.participants).toBe(projectArgs.participants);

  if (typeof projectArgs.date === "string") {
    expect(eventProject.date.getTime()).toBe(
      new Date(projectArgs.date).getTime()
    );
  } else {
    expect(eventProject.date.getTime()).toBe(projectArgs.date.getTime());
  }

  // Get the event request list and check that the new one is included

  const eventProjectList = handleGetEventProjects(serviceManager);

  expect(eventProjectList).toContain(eventProject);
});

test("event project access control", () => {
  const customerService = createUser(role.customerService);
  const seniorCustomerService = createUser(role.seniorCustomerService);
  const admin = createUser(role.administrationManager);
  const serviceManager = createUser(role.serviceManager);

  // Create event request and check that it is correct
  const projectArgs: EventTemplateArguments = {
    budget: 1000,
    client: "bob",
    date: new Date(),
    description: "Party",
    participants: 10000,
    type: "test",
  };

  let eventProject = createWithArgsProject(projectArgs);

  expect(eventProject).toBeInstanceOf(EventProject);

  // Customer service shouldn't be able to fetch
  expect(() => {
    handleGetEventProject(customerService, eventProject.id);
  }).toThrow();

  expect(handleGetEventProject(seniorCustomerService, eventProject.id)).toBe(
    eventProject
  );

  // This should throw since only admin can change information
  expect(() => {
    handleEditEventProject(serviceManager, eventProject.id, {
      description: "Super party",
      status: eventStatus.inProgress,
    });
  }).toThrow();

  const newDescription = "IT party";

  // Set to in progress and change description
  eventProject = handleEditEventProject(admin, eventProject.id, {
    description: "IT party",
    status: eventStatus.inProgress,
  });

  expect(eventProject.description).toBe(newDescription);
  expect(eventProject.status).toBe(eventStatus.inProgress);
});
