import jwt from "jsonwebtoken";
import { User } from "../models/user";
import storage from "../storage";
import { JWT_SECRET } from "../utils/constants";

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

export const handleLogin = (
  email: string,
  password: string
): { accessToken: string; user: Required<User> } => {
  const user = storage.users.find((u) => u.email === email);

  if (user) {
    if (password === user.password) {
      const accessToken = generateTokens(user);
      return { accessToken, user };
    } else {
      throw { error: Error("Incorrect password"), status: 400 };
    }
  } else {
    throw { error: Error("No user found"), status: 404 };
  }
};
