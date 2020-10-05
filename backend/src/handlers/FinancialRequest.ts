import {
  FinancialRequest,
  FinancialRequestArgs,
} from "../models/FinancialRequest";
import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleCreateFinancialRequest = (
  user: Required<User>,
  values: FinancialRequestArgs
): FinancialRequest => {
  if (
    user.role === role.productionManager ||
    user.role === role.serviceManager
  ) {
    const financialRequest = new FinancialRequest(values);
    storage.financialRequests[financialRequest.id] = financialRequest;
    return financialRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditFinancialRequest = (
  user: Required<User>,
  values: Partial<FinancialRequest>,
  financialRequestId: number
): FinancialRequest => {
  const financialRequest = storage.financialRequests[financialRequestId];
  if (
    user.role === role.financialManager ||
    financialRequest.reporter === user.id
  ) {
    if (
      values.status !== undefined &&
      values.status !== financialRequest.status &&
      user.role !== role.financialManager
    ) {
      throw {
        error: new Error("Only financial manager can set status"),
        status: 403,
      };
    }

    const newFinancialRequest = { ...financialRequest, ...values };
    storage.financialRequests[financialRequestId] = newFinancialRequest;

    return newFinancialRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetFinancialRequest = (
  user: Required<User>,
  financialRequestId: number
): FinancialRequest => {
  const financialRequest = storage.financialRequests[financialRequestId];
  if (
    financialRequest.reporter === user.id ||
    user.role === role.financialManager
  ) {
    return financialRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetFinancialRequests = (
  user: Required<User>
): Array<FinancialRequest> => {
  if (user.role === role.financialManager) {
    return Object.values(storage.financialRequests);
  } else if (
    user.role === role.serviceManager ||
    user.role === role.productionManager
  ) {
    const allRequests = Object.values(storage.financialRequests);
    const myRequests = allRequests.filter(
      (request) => request.reporter === user.id
    );
    return myRequests;
  }

  throw { error: new Error("Insufficient access"), status: 403 };
};
