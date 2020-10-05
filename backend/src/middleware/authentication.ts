import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import storage from "../storage";
import { JWT_SECRET } from "../utils/constants";
import { handleResponse } from "../utils/responses";
import role from "../utils/role";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authToken = req.get("Authorization");
  if (authToken) {
    try {
      const {
        data: { id },
      } = jwt.verify(authToken, JWT_SECRET) as Required<{
        data: { id: string; userRole: role };
      }>;

      const user = storage.users[id];
      if (user) {
        res.locals.user = user;
      } else {
        handleResponse(res, new Error("Could not authenticate"), null, 401);
      }
    } catch (error) {
      handleResponse(res, new Error(error.message), null, 401);
    }
  } else {
    handleResponse(res, new Error("No token"), null, 401);
  }
  next();
};

export default authenticate;
