import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import storage from "../storage";
import { JWT_SECRET } from "../utils/constants";
import { handleResponse } from "../utils/responses";

export const generateTokens = (user: Required<User>): string => {
  const { id, role } = user;
  const accessToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
      data: { id, userRole: role },
    },
    JWT_SECRET
  );

  return accessToken;
};

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
  const user = storage.users.find((u) => u.email === email);

  if (user) {
    if (password === user.password) {
      const accessToken = generateTokens(user);
      handleResponse(res, null, { accessToken, user }, 200);
    } else {
      handleResponse(res, new Error("Incorrect password"), null, 400);
    }
  } else {
    handleResponse(res, new Error("No user found"), null, 404);
  }
};
