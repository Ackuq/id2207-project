import {
  handleCreateEventRequest,
  handleEditEventRequest,
  handleGetEventRequests,
} from "../src/handlers/EventRequest";
import {
  EventRequest,
  EventRequestArguments,
  requestStatus,
} from "../src/models/Event";
import { UserParams } from "../src/models/User";
import addUser from "../src/utils/addUser";
import role from "../src/utils/role";

test("create and list event requests", () => {
  const userDetails: UserParams = {
    name: "John Doe",
    email: "john@doe.se",
    type: role.customerService,
    password: "password",
  };

  const user = addUser(userDetails);

  const eventRequestDetails: EventRequestArguments = {
    reporter: user.id,
    description: "Test",
    type: "test",
    budget: 1000,
    participants: 1000,
    client: "bob",
    date: new Date(),
  };

  // Create event request and check that it is correct

  const eventRequest = handleCreateEventRequest(eventRequestDetails);

  expect(eventRequest).toBeInstanceOf(EventRequest);

  expect(eventRequest.reporter).toBe(user.id);
  expect(eventRequest.description).toBe(eventRequestDetails.description);
  expect(eventRequest.type).toBe(eventRequestDetails.type);
  expect(eventRequest.budget).toBe(eventRequestDetails.budget);
  expect(eventRequest.client).toBe(eventRequestDetails.client);

  if (typeof eventRequestDetails.date === "string") {
    expect(eventRequest.date).toBe(
      new Date(eventRequestDetails.date).getTime()
    );
  } else if (eventRequest.date instanceof Date) {
    expect(eventRequest.date.getTime()).toBe(
      eventRequestDetails.date.getTime()
    );
  }

  // Get the event request list and check that the new one is included

  const eventRequestList = handleGetEventRequests(user);

  expect(eventRequestList).toContain(eventRequest);
});

test("event request access control", () => {
  const usersDetails: Array<UserParams> = [
    {
      name: "Anna",
      email: "anna@doe.se",
      type: role.customerService,
      password: "password",
    },
    {
      name: "Bob",
      email: "bob@doe.se",
      type: role.seniorCustomerService,
      password: "password",
    },
    {
      name: "Charlie",
      email: "charlie@doe.se",
      type: role.financialManager,
      password: "password",
    },
    {
      name: "David",
      email: "david@doe.se",
      type: role.administrationManager,
      password: "password",
    },
  ];

  const users = usersDetails.map(addUser);

  const cst = users[0];
  const scs = users[1];
  const financial = users[2];
  const admin = users[3];

  // Customer service creates event
  const eventRequestDetails: EventRequestArguments = {
    reporter: cst.id,
    description: "Test",
    type: "test",
    budget: 1000,
    participants: 1000,
    client: "bob",
    date: new Date(),
  };

  // Create event request and check that it is correct

  let eventRequest = handleCreateEventRequest(eventRequestDetails);

  expect(eventRequest).toBeInstanceOf(EventRequest);

  // This should throw since only senior customer officer can set to feasible
  expect(() => {
    handleEditEventRequest(admin, eventRequest.id, {
      status: requestStatus.feasible,
    });
  }).toThrow();

  // This should throw since only senior customer officer can set to feasible
  eventRequest = handleEditEventRequest(scs, eventRequest.id, {
    status: requestStatus.feasible,
  });

  expect(eventRequest.status).toBe(requestStatus.feasible);

  // This should throw since budget isn't approved
  expect(() => {
    handleEditEventRequest(admin, eventRequest.id, {
      status: requestStatus.approved,
    });
  }).toThrow();

  // This should throw since only financial manager can change budget
  expect(() => {
    handleEditEventRequest(admin, eventRequest.id, {
      budgetApproved: true,
    });
  }).toThrow();

  // Approve budget
  eventRequest = handleEditEventRequest(financial, eventRequest.id, {
    budgetApproved: true,
  });

  expect(eventRequest.budgetApproved).toBe(true);

  // This should throw since only administration manager can change status
  expect(() => {
    handleEditEventRequest(financial, eventRequest.id, {
      status: requestStatus.approved,
    });
  }).toThrow();

  eventRequest = handleEditEventRequest(admin, eventRequest.id, {
    status: requestStatus.approved,
  });

  expect(eventRequest.status).toBe(requestStatus.approved);
});
