import generateId from "../utils/generateId";

export interface FinancialRequestArgs {
  project: number;
  amount: number;
  reason: string;
  department: "administration" | "service" | "production" | "financial";
  reporter: string;
}

export enum financialRequestStatus {
  pending = "pending",
  rejected = "rejected",
  accepted = "accepted",
}

export class FinancialRequest {
  status = financialRequestStatus.pending;
  id;
  project;
  amount;
  reason;
  department;
  reporter;
  constructor(values: FinancialRequestArgs) {
    this.id = generateId("financialRequests");
    this.project = values.project;
    this.amount = values.amount;
    this.reason = values.reason;
    this.department = values.department;
    this.reporter = values.reporter;
  }
}
