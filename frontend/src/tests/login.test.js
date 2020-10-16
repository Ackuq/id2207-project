import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import App from "../App";

const user = {
  email: "customerService@test.se",
  password: "password",
};

test("login", async () => {
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
