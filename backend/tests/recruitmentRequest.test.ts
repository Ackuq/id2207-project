import {
  handleCreateRecruitmentRequest,
  handleEditRecruitmentRequest,
  handleGetRecruitmentRequest,
  handleGetRecruitmentRequests,
} from "../src/handlers/recruitmentRequest";
import {
  RecruitmentRequestArgs,
  recruitmentRequestStatus,
} from "../src/models/RecruitmentRequest";
import role from "../src/utils/role";
import { createUser } from "../src/utils/helpers";

const serviceManager = createUser(role.serviceManager);
const productionManager = createUser(role.productionManager);

const HR = createUser(role.HR);

test("create, edit and approve recruitment request", () => {
  // Only sub team managers can create

  expect(() => {
    handleCreateRecruitmentRequest(HR, {
      department: "production",
      description: "asd",
      reporter: HR.id,
      experience: 3,
      position: "Chef",
    });
  }).toThrow();

  const args: RecruitmentRequestArgs = {
    department: "production",
    description: "asd",
    reporter: serviceManager.id,
    experience: 3,
    position: "Chef",
  };

  let recruitmentRequest = handleCreateRecruitmentRequest(serviceManager, args);

  expect(recruitmentRequest.department).toBe(args.department);
  expect(recruitmentRequest.description).toBe(args.description);
  expect(recruitmentRequest.experience).toBe(args.experience);
  expect(recruitmentRequest.partTime).toBe(false);
  expect(recruitmentRequest.position).toBe(args.position);
  expect(recruitmentRequest.reporter).toBe(args.reporter);

  // Check that only HR and creator can list it
  expect(handleGetRecruitmentRequests(serviceManager)).toContain(
    recruitmentRequest
  );
  expect(handleGetRecruitmentRequests(HR)).toContain(recruitmentRequest);
  expect(handleGetRecruitmentRequests(productionManager)).not.toContain(
    recruitmentRequest
  );

  // Check that only HR and creator can fetch it
  expect(
    handleGetRecruitmentRequest(serviceManager, recruitmentRequest.id)
  ).toBe(recruitmentRequest);
  expect(handleGetRecruitmentRequest(HR, recruitmentRequest.id)).toBe(
    recruitmentRequest
  );
  expect(() => {
    handleGetRecruitmentRequest(productionManager, recruitmentRequest.id);
  }).toThrow();

  // Edit request
  recruitmentRequest = handleEditRecruitmentRequest(
    serviceManager,
    { description: "something else" },
    recruitmentRequest.id
  );

  expect(recruitmentRequest.description).toBe("something else");

  expect(() => {
    handleEditRecruitmentRequest(
      productionManager,
      { description: "something something else" },
      recruitmentRequest.id
    );
  }).toThrow();

  expect(recruitmentRequest.description).toBe("something else");

  // Approve the request, only HR can do this
  expect(() => {
    handleEditRecruitmentRequest(
      serviceManager,
      { status: recruitmentRequestStatus.approved },
      recruitmentRequest.id
    );
  }).toThrow();

  recruitmentRequest = handleEditRecruitmentRequest(
    HR,
    { status: recruitmentRequestStatus.approved },
    recruitmentRequest.id
  );

  expect(recruitmentRequest.status).toBe(recruitmentRequestStatus.approved);
});
