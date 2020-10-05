import { Request } from "express";
import { FinancialRequestArgs } from "../models/FinancialRequest";
import serializeError from "./serializeError";

export const financialRequestSerializer = (
  req: Request
): FinancialRequestArgs => {
  if (req.body) {
    const values: FinancialRequestArgs = req.body;
    if (!values.department) {
      throw serializeError("Request must have a department");
    }
    if (!values.amount) {
      throw serializeError("Request must have an amount");
    }
    if (!values.project) {
      throw serializeError("Request must specify a project");
    }
    if (!values.reason) {
      throw serializeError("Request must specify a reason");
    }
    return values;
  } else {
    throw serializeError("No data provided");
  }
};
