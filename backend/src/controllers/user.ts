import { Request, Response } from "express";
import { handleGetSubTeam } from "../handlers/user";
import storage from "../storage";
import { handleResponse } from "../utils/responses";

export const getMe = (req: Request, res: Response): void => {
  const { id } = res.locals;

  const user = storage.users.find((u) => u.id === id);
  if (user) {
    handleResponse(res, null, user, 200);
  } else {
    handleResponse(res, new Error("User not found"), null, 404);
  }
};

export const getUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  const user = storage.users.find((u) => u.id === id);
  if (user) {
    const { id, email, name, role } = user;
    handleResponse(res, null, { id, email, name, role }, 200);
  } else {
    handleResponse(res, new Error("User not found"), null, 404);
  }
};

export const getSubTeam = (req: Request, res: Response): void => {
  const { userRole } = res.locals;

  try {
    const subTeam = handleGetSubTeam(userRole);
    handleResponse(res, null, subTeam, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
