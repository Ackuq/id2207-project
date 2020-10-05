import { Request, Response } from "express";
import { eventRequestSerializer } from "../serializers/events";

import { handleResponse } from "../utils/responses";
import {
  handleCreateEventRequest,
  handleDeleteEventRequest,
  handleEditEventRequest,
  handleGetEventRequests,
  handleGetEventRequest,
} from "../handlers/EventRequest";

export const deleteEventRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;

  const eventId = parseInt(req.params.id);

  try {
    const eventRequests = handleDeleteEventRequest(user, eventId);
    handleResponse(res, null, eventRequests, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const editEventRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const eventId = parseInt(req.params.id);

  try {
    const eventRequest = handleEditEventRequest(user, eventId, req.body);
    handleResponse(res, null, eventRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const createEventRequest = (req: Request, res: Response): void => {
  try {
    const values = eventRequestSerializer(req);
    const { user } = res.locals;
    const eventRequest = handleCreateEventRequest({
      ...values,
      reporter: user.id,
    });
    handleResponse(res, null, eventRequest, 201);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getEventRequests = (req: Request, res: Response): void => {
  const { user } = res.locals;

  try {
    const eventRequests = handleGetEventRequests(user);
    handleResponse(res, null, eventRequests, 200);
  } catch (err) {
    handleResponse(res, err.error, null, err.status);
  }
};

export const getEventRequest = (req: Request, res: Response): void => {
  const { user } = res.locals;

  const eventId = parseInt(req.params.id);
  if (eventId) {
    try {
      const eventRequest = handleGetEventRequest(user, eventId);
      handleResponse(res, null, eventRequest, 200);
    } catch (err) {
      handleResponse(res, err.error, null, err.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};
