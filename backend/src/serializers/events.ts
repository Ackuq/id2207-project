import { Request } from "express";
import { EventRequestArguments } from "../models/Event";
import serializeError from "./serializeError";

export const eventRequestSerializer = (req: Request): EventRequestArguments => {
  if (req.body) {
    const values = req.body;
    if (!values.description) {
      throw serializeError("Request must have a description");
    }
    if (!values.type) {
      throw serializeError("Request must have a type");
    }
    if (!values.budget) {
      throw serializeError("Request must have a budget");
    }
    if (!values.date) {
      throw serializeError("Request must have a date");
    }
    if (!values.participants) {
      throw serializeError("Request must have the number of participants");
    }
    return values;
  } else {
    throw serializeError("No data provided");
  }
};
