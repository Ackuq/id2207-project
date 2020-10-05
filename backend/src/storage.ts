import { EventProject, EventRequest } from "./models/Event";
import { FinancialRequest } from "./models/FinancialRequest";
import { RecruitmentRequest } from "./models/RecruitmentRequest";
import { Task } from "./models/Task";
import { User } from "./models/User";

interface Storage {
  eventRequests: Record<number, EventRequest>;
  eventProjects: Record<number, EventProject>;
  tasks: Record<string, Task>;
  users: Record<string, Required<User>>;
  recruitmentRequests: Record<number, RecruitmentRequest>;
  financialRequests: Record<number, FinancialRequest>;
}

const storage: Storage = {
  eventRequests: {},
  eventProjects: {},
  tasks: {},
  users: {},
  recruitmentRequests: {},
  financialRequests: {},
};

export default storage;
