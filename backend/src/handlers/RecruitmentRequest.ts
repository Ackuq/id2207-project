import {
  RecruitmentRequest,
  RecruitmentRequestArgs,
} from "../models/RecruitmentRequest";
import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleCreateRecruitmentRequest = (
  user: Required<User>,
  values: RecruitmentRequestArgs
): RecruitmentRequest => {
  if (
    user.role === role.productionManager ||
    user.role === role.serviceManager
  ) {
    const recruitmentRequest = new RecruitmentRequest(values);
    storage.recruitmentRequests[recruitmentRequest.id] = recruitmentRequest;
    return recruitmentRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditRecruitmentRequest = (
  user: Required<User>,
  values: Partial<RecruitmentRequest>,
  recruitmentRequestId: number
): RecruitmentRequest => {
  const recruitmentRequest = storage.recruitmentRequests[recruitmentRequestId];
  if (user.role === role.HR || recruitmentRequest.reporter === user.id) {
    if (values.status !== recruitmentRequest.status && user.role !== role.HR) {
      throw { error: new Error("Only HR can set status"), status: 403 };
    }

    const newRecruitmentRequest = { ...recruitmentRequest, ...values };
    storage.recruitmentRequests[recruitmentRequestId] = newRecruitmentRequest;

    return newRecruitmentRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetRecruitmentRequest = (
  user: Required<User>,
  recruitmentRequestId: number
): RecruitmentRequest => {
  const recruitmentRequest = storage.recruitmentRequests[recruitmentRequestId];
  if (recruitmentRequest.reporter === user.id || user.role === role.HR) {
    return recruitmentRequest;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetRecruitmentRequests = (
  user: Required<User>
): Array<RecruitmentRequest> => {
  if (user.role === role.HR) {
    return Object.values(storage.recruitmentRequests);
  } else if (
    user.role === role.serviceManager ||
    user.role === role.productionManager
  ) {
    const allRequests = Object.values(storage.recruitmentRequests);
    const myRequests = allRequests.filter(
      (request) => request.reporter === user.id
    );
    return myRequests;
  }

  throw { error: new Error("Insufficient access"), status: 403 };
};
