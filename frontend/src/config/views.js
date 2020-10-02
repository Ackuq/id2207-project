import * as routes from "./routes";

export const viewInfo = {
  createEventRequest: {
    title: "Create Event Request",
    route: routes.createEventRequest,
  },
  eventRequests: { title: "Event Requests", route: routes.eventRequests },
};

export const hasView = (user, view) => user.views.includes(view);
