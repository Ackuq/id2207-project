import { Request } from "express";
import { RecruitmentRequestArgs } from "../models/RecruitmentRequest";
import serializeError from "./serializeError";

export const recruitmentRequestSerializer = (
  req: Request
): RecruitmentRequestArgs => {
  if (req.body) {
    const values: RecruitmentRequestArgs = req.body;
    if (!values.department) {
      throw serializeError("Request must have a department");
    }
    if (!values.description) {
      throw serializeError("Request must have a description");
    }
    if (!values.experience) {
      throw serializeError("Request must specify experience");
    }
    if (!values.position) {
      throw serializeError("Request must specify a position");
    }
    return values;
  } else {
    throw serializeError("No data provided");
  }
};
