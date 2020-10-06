import generateId from "../utils/generateId";

export enum priority {
  high = "high",
  medium = "medium",
  low = "low",
}

export enum taskStatus {
  pending = "pending",
  accepted = "accepted",
  completed = "completed",
  rejected = "rejected",
}

export interface TaskArguments {
  reporter: string;
  assignee: string;
  description: string;
  priority: priority;
  project: number;
}

export class Task {
  id;
  reporter;
  assignee;
  description;
  priority;
  project;
  plan = "";
  budgetConflict = false;
  status = taskStatus.pending;
  constructor(values: TaskArguments) {
    this.id = generateId("tasks");
    this.project = values.project;
    this.reporter = values.reporter;
    this.assignee = values.assignee;
    this.description = values.description;
    this.priority = values.priority;
  }
}
