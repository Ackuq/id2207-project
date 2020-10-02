import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { handleResponse } from "../utils/responses";

const authenticate = (req, res, next) => {
  const authToken = req.get("Authorization");
  if (authToken) {
    try {
      const {
        data: { userId },
      } = jwt.verify(authToken, JWT_SECRET);

      res.locals.user = userId;
    } catch (error) {
      return handleResponse(res, new Error(error.message), null, 401);
    }
  } else {
    return handleResponse(res, new Error("No token"), null, 401);
  }
  return next();
};

export default authenticate;
