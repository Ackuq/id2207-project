import { EventProject, EventRequest } from "../models/event";
import storage from "../storage";
import role from "../utils/role";

export const handleDeleteEventProject = (
  userRole: role,
  eventId: number
): EventProject[] => {
  const eventProject = storage.eventProjects[eventId];

  if (!eventProject) {
    throw { error: new Error("Event request not found"), status: 404 };
  }

  if (userRole === role.administrationManager) {
    delete storage.eventProjects[eventId];
    return Object.values(storage.eventProjects);
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditEventProject = (
  userRole: role,
  eventId: number,
  newValues: Partial<EventProject>
): EventProject => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    /**
     * TODO: add some more roles here
     */
    if (userRole === role.administrationManager) {
      const index = storage.eventRequests.findIndex((e) => e.id === eventId);
      const newEventProject = { ...eventProject, ...newValues };

      storage.eventProjects[index] = newEventProject;

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
  userRole: string
): Array<EventProject> => {
  if (
    userRole === role.serviceManager ||
    userRole === role.productionManager ||
    userRole === role.financialManager ||
    userRole === role.administrationManager
  ) {
    return Object.values(storage.eventProjects);
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventProject = (
  eventId: number,
  userRole: role,
  userId: string
): EventProject => {
  const eventProject = storage.eventProjects[eventId];
  if (eventProject) {
    if (
      userRole === role.seniorCustomerService ||
      userRole === role.financialManager ||
      userRole === role.administrationManager ||
      userRole === role.serviceManager ||
      userRole === role.productionManager
    )
      return eventProject;
    else if (
      userRole === role.productionTeamMember ||
      userRole === role.serviceTeamMember
    ) {
      // Check if user got task in project
      const tasks = eventProject.tasks;
      const hasTaskInProject = tasks.some((taskId) => {
        const task = storage.tasks[taskId];
        if (task) {
          return task.assignee === userId;
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
