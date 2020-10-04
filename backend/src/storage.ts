import { EventProject, EventRequest } from "./models/event";
import { Task } from "./models/task";
import { User } from "./models/user";

interface Storage {
  eventRequests: Array<EventRequest>;
  eventProjects: Record<number, EventProject>;
  tasks: Record<string, Task>;
  users: Array<Required<User>>;
}

const storage: Storage = {
  eventRequests: [],
  eventProjects: {},
  tasks: {},
  users: [],
};

export default storage;
