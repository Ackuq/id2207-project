import { EventProject, EventRequest } from "../models/Event";
import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleDeleteEventProject = (
  user: Required<User>,
  eventId: number
): EventProject[] => {
  const eventProject = storage.eventProjects[eventId];

  if (!eventProject) {
    throw { error: new Error("Event request not found"), status: 404 };
  }

  if (user.role === role.administrationManager) {
    delete storage.eventProjects[eventId];
    return Object.values(storage.eventProjects);
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditEventProject = (
  user: Required<User>,
  eventId: number,
  newValues: Partial<EventProject>
): EventProject => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    if (user.role === role.administrationManager) {
      const newEventProject = { ...eventProject, ...newValues };

      storage.eventProjects[eventId] = newEventProject;

      return newEventProject;
    }
    throw {
      error: new Error("Insufficient access"),
      status: 403,
    };
  } else {
    throw {
      error: new Error("Event project not found"),
      status: 404,
    };
  }
};

export const handleCreateEventProject = (
  eventRequest: EventRequest
): EventProject => {
  const eventProject = new EventProject(eventRequest);

  storage.eventProjects[eventProject.id] = eventProject;

  return eventProject;
};

export const handleGetEventProjects = (
  user: Required<User>
): Array<EventProject> => {
  if (
    user.role === role.serviceManager ||
    user.role === role.productionManager ||
    user.role === role.financialManager ||
    user.role === role.administrationManager
  ) {
    return Object.values(storage.eventProjects);
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventProject = (
  user: Required<User>,
  eventId: number
): EventProject => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    if (
      user.role === role.seniorCustomerService ||
      user.role === role.financialManager ||
      user.role === role.administrationManager ||
      user.role === role.serviceManager ||
      user.role === role.productionManager
    )
      return eventProject;
    else if (
      user.role === role.productionTeamMember ||
      user.role === role.serviceTeamMember
    ) {
      // Check if user got task in project
      const tasks = eventProject.tasks;
      const hasTaskInProject = tasks.some((taskId) => {
        const task = storage.tasks[taskId];
        if (task) {
          return task.assignee === user.id;
        } else {
          return false;
        }
      });
      if (hasTaskInProject) {
        return eventProject;
      }
    }
    throw { error: new Error("Insufficient access"), status: 403 };
  } else {
    throw { error: new Error("Event project not found"), status: 404 };
  }
};
