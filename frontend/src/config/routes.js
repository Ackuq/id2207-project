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

export const createRecruitmentRequest = "/createRecruitmentRequest";

export const recruitmentRequests = "/recruitmentRequests";
export const recruitmentRequest = "/recruitmentRequests/:id";
export const recruitmentRequestUrl = (id) => `/recruitmentRequests/${id}`;

export const createFinancialRequest = "/createFinancialRequest";

export const financialRequests = "/financialRequests";
export const financialRequest = "/financialRequests/:id";
export const financialRequestUrl = (id) => `/financialRequests/${id}`;

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
