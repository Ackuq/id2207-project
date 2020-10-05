import { Request, Response } from "express";
import {
  handleCreateRecruitmentRequest,
  handleEditRecruitmentRequest,
  handleGetRecruitmentRequest,
  handleGetRecruitmentRequests,
} from "../handlers/recruitmentRequest";
import { recruitmentRequestSerializer } from "../serializers/recruitmentRequest";
import { handleResponse } from "../utils/responses";

export const createRecruitmentRequest = (req: Request, res: Response): void => {
  try {
    const values = recruitmentRequestSerializer(req);
    const { user } = res.locals;
    const recruitmentRequest = handleCreateRecruitmentRequest(user, {
      ...values,
      reporter: user.id,
    });
    handleResponse(res, null, recruitmentRequest, 201);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const editRecruitmentRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const requestId = parseInt(req.params.id);

  try {
    const recruitmentRequest = handleEditRecruitmentRequest(
      user,
      req.body,
      requestId
    );
    handleResponse(res, null, recruitmentRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getRecruitmentRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const requestId = parseInt(req.params.id);

  try {
    const recruitmentRequest = handleGetRecruitmentRequest(user, requestId);
    handleResponse(res, null, recruitmentRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getRecruitmentRequests = (req: Request, res: Response): void => {
  const { user } = res.locals;

  try {
    const recruitmentRequest = handleGetRecruitmentRequests(user);
    handleResponse(res, null, recruitmentRequest, 201);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
