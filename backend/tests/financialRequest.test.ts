import {
  handleCreateFinancialRequest,
  handleEditFinancialRequest,
  handleGetFinancialRequest,
  handleGetFinancialRequests,
} from "../src/handlers/FinancialRequest";
import {
  FinancialRequestArgs,
  financialRequestStatus,
} from "../src/models/FinancialRequest";
import role from "../src/utils/role";
import { createProject, createUser } from "./helpers";

const serviceManager = createUser(role.serviceManager);
const productionManager = createUser(role.productionManager);

const financialManager = createUser(role.financialManager);

const project = createProject();

test("create, edit and approve financial request", () => {
  // Only sub team managers can create

  expect(() => {
    handleCreateFinancialRequest(financialManager, {
      department: "production",
      amount: 100,
      reporter: financialManager.id,
      project: project.id,
      reason: "Need more money",
    });
  }).toThrow();

  const args: FinancialRequestArgs = {
    department: "production",
    amount: 100,
    reporter: serviceManager.id,
    project: project.id,
    reason: "Need more money",
  };

  let financialRequest = handleCreateFinancialRequest(serviceManager, args);

  expect(financialRequest.department).toBe(args.department);
  expect(financialRequest.amount).toBe(args.amount);
  expect(financialRequest.project).toBe(args.project);
  expect(financialRequest.reason).toBe(args.reason);
  expect(financialRequest.reporter).toBe(serviceManager.id);
  expect(financialRequest.status).toBe(financialRequestStatus.pending);

  // Check that only HR and creator can list it
  expect(handleGetFinancialRequests(serviceManager)).toContain(
    financialRequest
  );
  expect(handleGetFinancialRequests(financialManager)).toContain(
    financialRequest
  );
  expect(handleGetFinancialRequests(productionManager)).not.toContain(
    financialRequest
  );

  // Check that only HR and creator can fetch it
  expect(handleGetFinancialRequest(serviceManager, financialRequest.id)).toBe(
    financialRequest
  );
  expect(handleGetFinancialRequest(financialManager, financialRequest.id)).toBe(
    financialRequest
  );
  expect(() => {
    handleGetFinancialRequest(productionManager, financialRequest.id);
  }).toThrow();

  const newReason = "something else";

  // Edit request
  financialRequest = handleEditFinancialRequest(
    serviceManager,
    { reason: newReason },
    financialRequest.id
  );

  expect(financialRequest.reason).toBe("something else");

  expect(() => {
    handleEditFinancialRequest(
      productionManager,
      { reason: "something something else" },
      financialRequest.id
    );
  }).toThrow();

  expect(financialRequest.reason).toBe(newReason);

  // Approve the request, only HR can do this
  expect(() => {
    handleEditFinancialRequest(
      serviceManager,
      { status: financialRequestStatus.accepted },
      financialRequest.id
    );
  }).toThrow();

  financialRequest = handleEditFinancialRequest(
    financialManager,
    { status: financialRequestStatus.accepted },
    financialRequest.id
  );

  expect(financialRequest.status).toBe(financialRequestStatus.accepted);
});
