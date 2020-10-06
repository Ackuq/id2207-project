import * as routes from "./routes";

export const viewInfo = {
  createEventRequest: {
    title: "Create Event Request",
    route: routes.createEventRequest,
  },
  eventRequests: { title: "Event Requests", route: routes.eventRequests },
  eventProjects: { title: "Event Projects", route: routes.eventProjects },
  tasks: { title: "Tasks", route: routes.tasks },
  financialRequests: {
    title: "Financial Requests",
    route: routes.financialRequests,
  },
  createFinancialRequest: {
    title: "Create Financial Requests",
    route: routes.createFinancialRequest,
  },
  recruitmentRequests: {
    title: "Recruitment Requests",
    route: routes.recruitmentRequests,
  },
  createRecruitmentRequest: {
    title: "Create Recruitment Requests",
    route: routes.createRecruitmentRequest,
  },
};

export const hasView = (user, view) => user.views.includes(view);
