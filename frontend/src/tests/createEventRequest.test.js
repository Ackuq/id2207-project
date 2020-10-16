import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import App from "../App";

const user = {
  email: "customerService@test.se",
  password: "password",
};

const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

beforeEach(async () => {
  render(<App />);
  const email = screen.getByLabelText("E-mail address");
  const password = screen.getByLabelText("Password");

  fireEvent.change(email, { target: { value: user.email } });
  expect(email.value).toBe(user.email);

  fireEvent.change(password, { target: { value: user.password } });
  expect(password.value).toBe(user.password);

  const button = screen
    .getByText("Login", { selector: "span" })
    .closest("button");
  fireEvent.click(button);

  // If successful, screen with logout button should be present
  await waitFor(() => screen.findByText("Logout", { selector: "span" }));
});

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let month = "" + (tomorrow.getMonth() + 1),
    day = "" + tomorrow.getDate(),
    year = tomorrow.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};

const eventRequest = {
  client: "KTH",
  description: "Degree Project Fair",
  type: "Academia",
  date: getTomorrowDate(),
  participants: 100,
  budget: 100000,
};

test("create event request", async () => {
  render(<App />);

  // Navigate to create event request
  fireEvent.click(screen.getByText("Create Event Request").closest("a"));

  // When successful, the form should render
  await waitFor(() => screen.getByLabelText("Client"));

  const client = screen.getByLabelText("Client");
  const description = screen.getByLabelText("Description");
  const type = screen.getByLabelText("Type");
  const date = screen.getByLabelText("Date");
  const participants = screen.getByLabelText("Participants");
  const budget = screen.getByLabelText("Budget");

  fireEvent.change(client, { target: { value: eventRequest.client } });
  expect(client.value).toBe(eventRequest.client);

  fireEvent.change(description, {
    target: { value: eventRequest.description },
  });
  expect(description.value).toBe(eventRequest.description);

  fireEvent.change(type, { target: { value: eventRequest.type } });
  expect(type.value).toBe(eventRequest.type);

  fireEvent.change(date, { target: { value: eventRequest.date } });
  expect(date.value).toBe(eventRequest.date);

  fireEvent.change(participants, {
    target: { value: eventRequest.participants },
  });
  expect(participants.value).toBe(eventRequest.participants.toString());

  fireEvent.change(budget, { target: { value: eventRequest.budget } });
  expect(budget.value).toBe(eventRequest.budget.toString());

  const submit = screen.getByText("Submit").closest("button");

  await waitFor(() => !submit.disabled);

  fireEvent.click(submit);

  // See that the event request and it's ID are shown
  await waitFor(() => screen.findByText(/^Event Request #/));

  // Get the ID
  const id = screen
    .getByText(/^Event Request #/)
    .textContent.split("Event Request #")[1]
    .trimRight();

  await waitFor(() => timeout(500));

  // Navigate to list
  fireEvent.click(screen.getAllByText("Event Requests")[0].closest("a"));

  // See that the event request and it's ID are shown
  await waitFor(() => screen.findByText(id), { selector: "th" });
});
