export const createEventRequest = "/createEventRequest";

export const eventRequests = "/eventRequests";
export const eventRequest = "/eventRequests/:id";
export const eventRequestUrl = (id) => `/eventRequests/${id}`;

export const eventProjects = "/eventProjects";
export const eventProject = "/eventProjects/:id";
export const eventProjectUrl = (id) => `/eventProjects/${id}`;

export const tasks = "/tasks";
export const task = "/tasks/:id";
export const taskUrl = (id) => `/tasks/${id}`;

export const login = "/login";
export const home = "/";

export const routeToView = (route) => {
  switch (route) {
    case createEventRequest:
      return "createEventRequest";
    case eventRequests:
      return "eventRequests";
    default:
      return null;
  }
};
