import { Task, TaskArguments, taskStatus } from "../models/Task";
import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleCreateTask = (
  user: Required<User>,
  values: TaskArguments
): Task => {
  const eventProject = storage.eventProjects[values.project];
  if (!eventProject) {
    throw { error: new Error("Event project not found"), status: 404 };
  }

  if (
    user.role === role.serviceManager ||
    user.role === role.productionManager
  ) {
    try {
      const task = new Task(values);
      storage.tasks[task.id] = task;
      storage.eventProjects[values.project].tasks.push(task.id);
      return task;
    } catch (e) {
      throw { error: e, status: 400 };
    }
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditTask = (
  user: Required<User>,
  values: Partial<Task>,
  taskId: number
): Task => {
  const task = storage.tasks[taskId];
  if (user.id === task.reporter || user.id === task.assignee) {
    if (values.status !== undefined && values.status !== task.status) {
      if (
        (values.status === taskStatus.accepted ||
          values.status === taskStatus.rejected) &&
        user.id !== task.assignee
      ) {
        throw {
          error: new Error("Only assignee can accept or reject task"),
          status: 403,
        };
      } else if (
        values.status !== taskStatus.accepted &&
        values.status !== taskStatus.rejected &&
        user.id === task.assignee
      ) {
        throw {
          error: new Error("Only reporter can change the status"),
          status: 403,
        };
      }
    }

    if (
      ((values.budgetConflict !== undefined &&
        values.budgetConflict !== task.budgetConflict) ||
        (values.plan !== undefined && values.plan !== task.plan)) &&
      user.id !== task.assignee
    ) {
      throw {
        error: new Error("Only assignee can create plan and budget conflict"),
        status: 403,
      };
    }

    if (
      ((values.description !== undefined &&
        values.description !== task.description) ||
        (values.priority !== undefined &&
          values.priority !== task.description) ||
        (values.assignee !== undefined && values.assignee !== task.assignee)) &&
      user.id !== task.reporter
    ) {
      throw {
        error: new Error(
          "Only reporter can edit description, priority and assignee"
        ),
        status: 403,
      };
    }

    const newTask = { ...task, ...values };
    storage.tasks[taskId] = newTask;
    return newTask;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventTasks = (
  user: Required<User>,
  eventId: number
): Array<Task> => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    if (
      user.role === role.seniorCustomerService ||
      user.role === role.financialManager ||
      user.role === role.administrationManager ||
      user.role === role.serviceManager ||
      user.role === role.productionManager ||
      user.role === role.productionTeamMember ||
      user.role === role.serviceTeamMember
    ) {
      const tasks = eventProject.tasks.map((taskId) => storage.tasks[taskId]);
      return tasks;
    }

    throw { error: new Error("Insufficient access"), status: 403 };
  } else {
    throw { error: new Error("Event project not found"), status: 404 };
  }
};

export const handleGetTasks = (user: Required<User>): Array<Task> => {
  if (
    user.role === role.productionManager ||
    user.role === role.serviceManager
  ) {
    const allTasks = Object.values(storage.tasks);
    const myTasks = allTasks.filter((task) => task.reporter === user.id);
    return myTasks;
  } else if (
    user.role === role.productionTeamMember ||
    user.role === role.serviceTeamMember
  ) {
    const allTasks = Object.values(storage.tasks);
    const myTasks = allTasks.filter((task) => task.assignee === user.id);
    return myTasks;
  }
  throw { error: new Error("Insufficient access"), status: 403 };
};

export const handleGetTask = (user: Required<User>, taskId: number): Task => {
  if (
    user.role === role.productionManager ||
    user.role === role.serviceManager
  ) {
    return storage.tasks[taskId];
  } else if (
    user.role === role.productionTeamMember ||
    user.role === role.serviceTeamMember
  ) {
    const task = storage.tasks[taskId];
    if (task.assignee === user.id) {
      return task;
    }
  }
  throw { error: new Error("Insufficient access"), status: 403 };
};
