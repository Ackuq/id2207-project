import { Request } from "express";
import { TaskArguments } from "../models/Task";

const genError = (message: string) => ({
  error: new Error(message),
  status: 400,
});

export const taskSerializer = (req: Request): TaskArguments => {
  if (req.body) {
    const values: TaskArguments = req.body;
    if (!values.description) {
      throw genError("Request must have a description");
    }
    if (!values.assignee) {
      throw genError("Request must have a assignee");
    }
    if (!values.priority) {
      throw genError("Request must have a priority");
    }
    return values;
  } else {
    throw genError("No data provided");
  }
};
