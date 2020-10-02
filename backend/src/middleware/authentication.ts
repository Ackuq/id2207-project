import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { handleResponse } from "../utils/responses";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authToken = req.get("Authorization");
  if (authToken) {
    try {
      const {
        data: { userId, role },
      } = jwt.verify(authToken, JWT_SECRET) as Record<string, any>;

      res.locals.user = userId;
      res.locals.role = role;
    } catch (error) {
      handleResponse(res, new Error(error.message), null, 401);
    }
  } else {
    handleResponse(res, new Error("No token"), null, 401);
  }
  next();
};

export default authenticate;
