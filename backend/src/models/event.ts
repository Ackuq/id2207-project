import generateId from "../utils/generateId";

interface EventTemplateArguments {
  description: string;
  type: string;
  budget: number;
  date: string;
  participants: string;
  client: string;
}

class EventTemplate {
  description;
  type;
  budget;
  date;
  participants;
  client;
  constructor(values: EventTemplateArguments) {
    this.client = values.client;
    this.description = values.description;
    this.type = values.type;
    this.budget = values.budget;
    this.date = new Date(values.date);
    this.participants = values.participants;
  }
}

export interface EventRequestArguments extends EventTemplateArguments {
  reporter: string;
}

export class EventRequest extends EventTemplate {
  status = "pending";
  id;
  reporter;

  constructor(values: EventRequestArguments) {
    super(values);
    this.id = generateId("eventRequests");
    this.reporter = values.reporter;
  }
}

interface EventProjectArguments extends EventTemplateArguments {
  status: string;
  reporter: string;
}

export class EventProject extends EventTemplate {
  status = "planning";
  id;
  reporter;
  tasks: Array<string> = [];

  constructor(values: EventProjectArguments) {
    super(values);
    this.id = generateId("eventProjects");
    this.reporter = values.reporter;
  }
}
