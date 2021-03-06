import generateId from "../utils/generateId";

export interface EventTemplateArguments {
  description: string;
  type: string;
  budget: number;
  date: string | Date;
  participants: number;
  client: string;
}

export enum requestStatus {
  pending = "pending",
  feasible = "feasible",
  approved = "approved",
  cancelled = "cancelled",
}

class EventTemplate {
  description;
  type;
  budget;
  date: Date | string;
  participants;
  client;
  archived = false;
  constructor(values: EventTemplateArguments) {
    this.client = values.client;
    this.description = values.description;
    this.type = values.type;
    this.budget = values.budget;
    if (typeof values.date === "string") {
      this.date = new Date(values.date);
    } else {
      this.date = values.date;
    }
    this.date = new Date(values.date);
    this.participants = values.participants;
  }
}

export interface EventRequestArguments extends EventTemplateArguments {
  reporter: string;
}

export class EventRequest extends EventTemplate {
  status: requestStatus = requestStatus.pending;
  id;
  reporter;
  budgetApproved = false;

  constructor(values: EventRequestArguments) {
    super(values);
    this.id = generateId("eventRequests");
    this.reporter = values.reporter;
  }
}

export enum eventStatus {
  planning = "planning",
  inProgress = "inProgress",
  completed = "completed",
  cancelled = "cancelled",
}

export class EventProject extends EventTemplate {
  status: eventStatus = eventStatus.planning;
  id;
  tasks: Array<number> = [];

  constructor(request: EventTemplateArguments) {
    super(request);
    this.id = generateId("eventProjects");
  }
}
