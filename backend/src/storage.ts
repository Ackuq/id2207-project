import { EventProject, EventRequest } from "./models/event";
import { User } from "./models/user";

interface Storage {
  eventRequests: Array<EventRequest>;
  eventProjects: Array<EventProject>;
  users: Array<Required<User>>;
}

const storage: Storage = {
  eventRequests: [],
  eventProjects: [],
  users: [],
};

export default storage;
