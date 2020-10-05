import { Request, Response } from "express";
import { handleResponse } from "../utils/responses";
import { taskSerializer } from "../serializers/tasks";
import {
  handleCreateTask,
  handleEditTask,
  handleGetEventTasks,
  handleGetTask,
  handleGetTasks,
} from "../handlers/Tasks";

export const createTask = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const eventId = parseInt(req.params.id);

  if (eventId) {
    try {
      const values = taskSerializer(req);
      const task = handleCreateTask(user, {
        ...values,
        reporter: user.id,
        project: eventId,
      });
      handleResponse(res, null, task, 201);
    } catch (e) {
      handleResponse(res, e.error, null, e.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};

export const editTask = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const taskId = parseInt(req.params.id);

  if (taskId) {
    try {
      const task = handleEditTask(user, req.body, taskId);
      handleResponse(res, null, task, 201);
    } catch (e) {
      handleResponse(res, e.error, null, e.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};

export const getEventTasks = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const eventId = parseInt(req.params.id);

  if (eventId) {
    try {
      const eventTasks = handleGetEventTasks(user, eventId);

      handleResponse(res, null, eventTasks, 200);
    } catch (e) {
      handleResponse(res, e.error, null, e.status);
    }
  } else {
    handleResponse(res, new Error("No id defined"), null, 400);
  }
};

export const getTasks = (req: Request, res: Response): void => {
  const { user } = res.locals;

  try {
    const eventTasks = handleGetTasks(user);

    handleResponse(res, null, eventTasks, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};

export const getTask = (req: Request, res: Response): void => {
  const { user } = res.locals;
  const taskId = parseInt(req.params.id);

  try {
    const eventTasks = handleGetTask(user, taskId);

    handleResponse(res, null, eventTasks, 200);
  } catch (e) {
    handleResponse(res, e.error, null, e.status);
  }
};
