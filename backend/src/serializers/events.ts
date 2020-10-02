import { Request } from "express";
import { EventRequestArguments } from "../models/event";

export const eventRequestSerializer = (req: Request): EventRequestArguments => {
  if (req.body) {
    const values = req.body;
    if (!values.description) {
      throw new Error("Request must have a description");
    }
    if (!values.type) {
      throw new Error("Request must have a type");
    }
    if (!values.budget) {
      throw new Error("Request must have a budget");
    }
    if (!values.date) {
      throw new Error("Request must have a date");
    }
    if (!values.participants) {
      throw new Error("Request must have the number of participants");
    }
    return values;
  } else {
    throw new Error("No data provided");
  }
};
