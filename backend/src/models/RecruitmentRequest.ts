import generateId from "../utils/generateId";

export interface RecruitmentRequestArgs {
  description: string;
  position: string;
  partTime?: boolean;
  department: "administration" | "service" | "production" | "financial";
  experience: number;
  reporter: string;
}

export enum recruitmentRequestStatus {
  pending = "pending",
  rejected = "rejected",
  approved = "approved",
}

export class RecruitmentRequest {
  status = recruitmentRequestStatus.pending;
  id;
  description;
  position;
  partTime;
  department;
  experience;
  reporter;
  constructor(values: RecruitmentRequestArgs) {
    this.id = generateId("recruitmentRequests");
    this.description = values.description;
    this.position = values.position;
    this.partTime = !!values.partTime;
    this.department = values.department;
    this.experience = values.experience;
    this.reporter = values.reporter;
  }
}
