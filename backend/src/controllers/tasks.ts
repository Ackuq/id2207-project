import { Request, Response } from "express";
import { handleResponse } from "../utils/responses";
import { taskSerializer } from "../serializers/tasks";
import {
  handleCreateTask,
  handleGetEventTasks,
  handleGetTask,
  handleGetTasks,
} from "../handlers/tasks";

export const createTask = (req: Request, res: Response): void => {
  const { userRole } = res.locals;
  const eventId = parseInt(req.params.id);

  if (eventId) {
    const values = taskSerializer(req);
    const reporter = res.locals.id;
    const eventRequest = handleCreateTask(
      { ...values, reporter },
      eventId,
      userRole
    );
    handleResponse(res, null, eventRequest, 201);
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};

export const getEventTasks = (req: Request, res: Response): void => {
  const { userRole } = res.locals;
  const eventId = parseInt(req.params.id);

  if (eventId) {
    try {
      const eventTasks = handleGetEventTasks(userRole, eventId);

      handleResponse(res, null, eventTasks, 200);
    } catch (e) {
      handleResponse(res, e.error, null, e.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};

export const getTasks = (req: Request, res: Response): void => {
  const { userRole, id: userId } = res.locals;

  try {
    const eventTasks = handleGetTasks(userRole, userId);

    handleResponse(res, null, eventTasks, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getTask = (req: Request, res: Response): void => {
  const { userRole, id: userId } = res.locals;
  const taskId = parseInt(req.params.id);

  try {
    const eventTasks = handleGetTask(userRole, userId, taskId);

    handleResponse(res, null, eventTasks, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
