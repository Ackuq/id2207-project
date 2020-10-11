import { EventProject, EventRequest } from "./models/Event";
import { FinancialRequest } from "./models/FinancialRequest";
import { RecruitmentRequest } from "./models/RecruitmentRequest";
import { Task } from "./models/Task";
import { User } from "./models/User";
import data from "../storage.json";

interface Storage {
  eventRequests: Record<number, EventRequest>;
  eventProjects: Record<number, EventProject>;
  tasks: Record<string, Task>;
  users: Record<string, Required<User>>;
  recruitmentRequests: Record<number, RecruitmentRequest>;
  financialRequests: Record<number, FinancialRequest>;
}

const initializeStorage = (): Storage => {
  const keys: Array<keyof Storage> = [
    "eventProjects",
    "eventRequests",
    "financialRequests",
    "recruitmentRequests",
    "tasks",
    "users",
  ];
  const hasAllKeys = keys.every((key) => data.hasOwnProperty(key));
  if (hasAllKeys) {
    return data as Storage;
  }
  return {
    eventRequests: {},
    eventProjects: {},
    tasks: {},
    users: {},
    recruitmentRequests: {},
    financialRequests: {},
  };
};

const storage: Storage = initializeStorage();

export default storage;
