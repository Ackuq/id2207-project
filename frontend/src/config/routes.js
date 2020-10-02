export const createEventRequest = "/createEventRequest";
export const eventRequests = "/eventRequests";
export const eventRequest = "/eventRequests/:id";
export const eventRequestUrl = (id) => `/eventRequests/${id}`;

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
