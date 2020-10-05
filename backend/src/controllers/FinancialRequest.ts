import { Request, Response } from "express";
import {
  handleCreateFinancialRequest,
  handleEditFinancialRequest,
  handleGetFinancialRequest,
  handleGetFinancialRequests,
} from "../handlers/FinancialRequest";
import { financialRequestSerializer } from "../serializers/financialRequest";
import { handleResponse } from "../utils/responses";

export const createFinancialRequest = (req: Request, res: Response): void => {
  try {
    const values = financialRequestSerializer(req);
    const { user } = res.locals;
    const financialRequest = handleCreateFinancialRequest(user, {
      ...values,
      reporter: user.id,
    });
    handleResponse(res, null, financialRequest, 201);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const editFinancialRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const requestId = parseInt(req.params.id);

  try {
    const financialRequest = handleEditFinancialRequest(
      user,
      req.body,
      requestId
    );
    handleResponse(res, null, financialRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getFinancialRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const requestId = parseInt(req.params.id);

  try {
    const financialRequest = handleGetFinancialRequest(user, requestId);
    handleResponse(res, null, financialRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getFinancialRequests = (req: Request, res: Response): void => {
  const { user } = res.locals;

  try {
    const financialRequest = handleGetFinancialRequests(user);
    handleResponse(res, null, financialRequest, 201);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
