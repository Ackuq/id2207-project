import { Request, Response } from "express";
import { handleLogin } from "../handlers/auth";
import { handleResponse } from "../utils/responses";

export const loginController = (req: Request, res: Response): void => {
  if (!req.body) {
    handleResponse(res, new Error("No data"), null, 400);
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    handleResponse(
      res,
      new Error("Email and password cannot be empty"),
      null,
      400
    );
    return;
  }

  try {
    const { accessToken, user } = handleLogin(email, password);
    handleResponse(res, null, { accessToken, user }, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
