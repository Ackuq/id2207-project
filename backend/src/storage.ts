import { EventProject, EventRequest } from "./models/Event";
import { Task } from "./models/Task";
import { User } from "./models/User";

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
