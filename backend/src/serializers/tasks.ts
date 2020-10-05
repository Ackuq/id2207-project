import { Request } from "express";
import { TaskArguments } from "../models/Task";
import serializeError from "./serializeError";

export const taskSerializer = (req: Request): TaskArguments => {
  if (req.body) {
    const values: TaskArguments = req.body;
    if (!values.description) {
      throw serializeError("Request must have a description");
    }
    if (!values.assignee) {
      throw serializeError("Request must have a assignee");
    }
    if (!values.priority) {
      throw serializeError("Request must have a priority");
    }
    return values;
  } else {
    throw serializeError("No data provided");
  }
};
