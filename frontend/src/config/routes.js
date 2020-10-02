export const createEventRequest = "/createEventRequest";
export const eventRequests = "/eventRequests";

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
