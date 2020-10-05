import { Request } from "express";
import { EventRequestArguments } from "../models/Event";

const genError = (message: string) => ({
  error: new Error(message),
  status: 400,
});

export const eventRequestSerializer = (req: Request): EventRequestArguments => {
  if (req.body) {
    const values = req.body;
    if (!values.description) {
      throw genError("Request must have a description");
    }
    if (!values.type) {
      throw genError("Request must have a type");
    }
    if (!values.budget) {
      throw genError("Request must have a budget");
    }
    if (!values.date) {
      throw genError("Request must have a date");
    }
    if (!values.participants) {
      throw genError("Request must have the number of participants");
    }
    return values;
  } else {
    throw genError("No data provided");
  }
};
