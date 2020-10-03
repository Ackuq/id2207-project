import { Request, Response } from "express";
import { EventRequest } from "../models/event";
import { eventRequestSerializer } from "../serializers/events";
import storage from "../storage";

import role from "../utils/role";
import { handleResponse } from "../utils/responses";

export const deleteEventRequest = (req: Request, res: Response): void => {
  const { userRole, id: userId } = res.locals;

  const id = parseInt(req.params.id);
  const eventRequest = storage.eventRequests.find((e) => e.id === id);

  if (!eventRequest) {
    handleResponse(res, new Error("Event request not found"), null, 404);
    return;
  }

  if (userRole === role.customerService && eventRequest.reporter === userId) {
    storage.eventRequests.filter((e) => e.id !== id);
    handleResponse(res, null, storage.eventRequests, 200);
  } else {
    handleResponse(res, new Error("Insufficient access"), null, 403);
  }
};

export const editEventRequest = (req: Request, res: Response): void => {
  const { userRole, id: userId } = res.locals;
  const id = parseInt(req.params.id);

  const eventRequest = storage.eventRequests.find((e) => e.id === id);
  if (eventRequest) {
    if (
      userRole === role.seniorCustomerService ||
      eventRequest.reporter === userId
    ) {
      const index = storage.eventRequests.findIndex((e) => e.id === id);
      const newEventRequest = { ...eventRequest, ...req.body };
      storage.eventRequests[index] = newEventRequest;
      handleResponse(res, null, newEventRequest, 200);
    } else {
      handleResponse(res, new Error("Insufficient access"), null, 403);
    }
  } else {
    handleResponse(res, new Error("Event request not found"), null, 400);
  }
};

export const createEventRequest = (req: Request, res: Response): void => {
  try {
    const values = eventRequestSerializer(req);
    const reporter = res.locals.id;
    const eventRequest = new EventRequest({ ...values, reporter });
    storage.eventRequests.push(eventRequest);
    handleResponse(res, null, eventRequest, 201);
  } catch (e) {
    handleResponse(res, e, null, 400);
  }
};

export const getEventRequests = (req: Request, res: Response): void => {
  const { userRole, id } = res.locals;

  if (userRole === role.seniorCustomerService) {
    handleResponse(res, null, storage.eventRequests, 200);
  } else if (userRole === role.customerService) {
    const eventRequests = storage.eventRequests.filter(
      (e) => e.reporter === id
    );
    handleResponse(res, null, eventRequests, 200);
  } else {
    handleResponse(res, new Error("Insufficient access"), null, 403);
  }
};

export const getEventRequest = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  if (id) {
    const eventRequest = storage.eventRequests.find((e) => e.id === id);
    if (eventRequest) {
      handleResponse(res, null, eventRequest, 200);
    } else {
      handleResponse(res, new Error("Event request not found"), null, 404);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};
