import { Task, TaskArguments } from "../models/task";
import storage from "../storage";
import role from "../utils/role";

export const handleCreateTask = (
  values: TaskArguments,
  eventId: number,
  userRole: role
): Task => {
  const eventProject = storage.eventProjects[eventId];
  if (!eventProject) {
    throw { error: new Error("Event project not found"), status: 404 };
  }

  if (userRole === role.serviceManager || userRole === role.productionManager) {
    try {
      const task = new Task({ ...values, project: eventId });
      storage.tasks[task.id] = task;
      storage.eventProjects[eventId].tasks.push(task.id);
      return task;
    } catch (e) {
      throw { error: e, status: 400 };
    }
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventTasks = (
  userRole: role,
  eventId: number
): Array<Task> => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    if (
      userRole === role.seniorCustomerService ||
      userRole === role.financialManager ||
      userRole === role.administrationManager ||
      userRole === role.serviceManager ||
      userRole === role.productionManager ||
      userRole === role.productionTeamMember ||
      userRole === role.serviceTeamMember
    ) {
      const tasks = eventProject.tasks.map((taskId) => storage.tasks[taskId]);
      return tasks;
    }

    throw { error: new Error("Insufficient access"), status: 403 };
  } else {
    throw { error: new Error("Event project not found"), status: 404 };
  }
};

export const handleGetTasks = (userRole: role, userId: string): Array<Task> => {
  if (userRole === role.productionManager || userRole === role.serviceManager) {
    const allTasks = Object.values(storage.tasks);
    const myTasks = allTasks.filter((task) => task.reporter === userId);
    return myTasks;
  } else if (
    userRole === role.productionTeamMember ||
    userRole === role.serviceTeamMember
  ) {
    const allTasks = Object.values(storage.tasks);
    const myTasks = allTasks.filter((task) => task.assignee === userId);
    return myTasks;
  }
  throw { error: new Error("Insufficient access"), status: 403 };
};

export const handleGetTask = (
  userRole: role,
  userId: string,
  taskId: number
): Task => {
  if (userRole === role.productionManager || userRole === role.serviceManager) {
    return storage.tasks[taskId];
  } else if (
    userRole === role.productionTeamMember ||
    userRole === role.serviceTeamMember
  ) {
    const task = storage.tasks[taskId];
    if (task.assignee === userId) {
      return task;
    }
  }
  throw { error: new Error("Insufficient access"), status: 403 };
};
