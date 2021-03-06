import { Request, Response } from "express";

import { handleResponse } from "../utils/responses";
import {
  handleDeleteEventProject,
  handleEditEventProject,
  handleGetEventProject,
  handleGetEventProjects,
} from "../handlers/EventProject";

export const deleteEventProject = (req: Request, res: Response): void => {
  const { user } = res.locals;

  const eventId = parseInt(req.params.id);

  try {
    const eventRequests = handleDeleteEventProject(user, eventId);
    handleResponse(res, null, eventRequests, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const editEventProject = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const eventId = parseInt(req.params.id);

  try {
    const eventRequest = handleEditEventProject(user, eventId, req.body);
    handleResponse(res, null, eventRequest, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getEventProjects = (req: Request, res: Response): void => {
  const { user } = res.locals;

  try {
    const eventRequests = handleGetEventProjects(user);
    handleResponse(res, null, eventRequests, 200);
  } catch (err) {
    handleResponse(res, err.error, null, err.status);
  }
};

export const getEventProject = (req: Request, res: Response): void => {
  const { user } = res.locals;

  const eventId = parseInt(req.params.id);
  if (eventId) {
    try {
      const eventRequest = handleGetEventProject(user, eventId);
      handleResponse(res, null, eventRequest, 200);
    } catch (err) {
      handleResponse(res, err.error, null, err.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};
