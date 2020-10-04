import * as routes from "./routes";

export const viewInfo = {
  createEventRequest: {
    title: "Create Event Request",
    route: routes.createEventRequest,
  },
  eventRequests: { title: "Event Requests", route: routes.eventRequests },
  eventProjects: { title: "Event Projects", route: routes.eventProjects },
  tasks: { title: "Tasks", route: routes.tasks },
};

export const hasView = (user, view) => user.views.includes(view);
