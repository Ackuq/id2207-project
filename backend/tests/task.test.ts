import {
  handleCreateTask,
  handleEditTask,
  handleGetTask,
  handleGetTasks,
} from "../src/handlers/Tasks";
import { priority, TaskArguments, taskStatus } from "../src/models/Task";
import storage from "../src/storage";
import role from "../src/utils/role";
import { createProject, createUser } from "./helpers";

const serviceManager = createUser(role.serviceManager);
const productionManager = createUser(role.productionManager);

const serviceTM = createUser(role.serviceTeamMember);
const productionTM = createUser(role.productionTeamMember);

const project = createProject();

test("add and accept task", () => {
  const serviceTaskArgs: TaskArguments = {
    assignee: serviceTM.id,
    reporter: serviceManager.id,
    description: "",
    project: project.id,
    priority: priority.high,
  };

  // Should throw since team members are not able to create tasks
  expect(() => {
    handleCreateTask(serviceTM, serviceTaskArgs);
  }).toThrow();

  let serviceTask = handleCreateTask(serviceManager, serviceTaskArgs);

  // Check that the task is in the project
  expect(storage.eventProjects[project.id].tasks).toContain(serviceTask.id);

  expect(serviceTask.assignee).toBe(serviceTM.id);
  expect(serviceTask.reporter).toBe(serviceManager.id);
  expect(serviceTask.budgetConflict).toBe(false);
  expect(serviceTask.description).toBe(serviceTaskArgs.description);
  expect(serviceTask.priority).toBe(serviceTaskArgs.priority);
  expect(serviceTask.project).toBe(project.id);
  expect(serviceTask.status).toBe(taskStatus.pending);

  // Accept the task
  serviceTask = handleEditTask(
    serviceTM,
    { status: taskStatus.accepted },
    serviceTask.id
  );

  expect(serviceTask.status).toBe(taskStatus.accepted);

  // Should throw since only the assigned member should be able to specify budget conflict and plan
  expect(() => {
    handleEditTask(serviceManager, { budgetConflict: true }, serviceTask.id);
  }).toThrow();
  expect(() => {
    handleEditTask(serviceManager, { plan: "true" }, serviceTask.id);
  }).toThrow();
  expect(() => {
    handleEditTask(productionTM, { budgetConflict: true }, serviceTask.id);
  }).toThrow();
  expect(() => {
    handleEditTask(productionTM, { plan: "true" }, serviceTask.id);
  }).toThrow();

  // Create plan and budget conflict
  serviceTask = handleEditTask(
    serviceTM,
    { plan: "Do something", budgetConflict: true },
    serviceTask.id
  );

  expect(serviceTask.budgetConflict).toBe(true);
  expect(serviceTask.plan).toBe("Do something");

  // Check that only service TM and their manager can fetch the task
  expect(handleGetTasks(productionTM)).not.toContain(serviceTask);
  expect(handleGetTasks(productionManager)).not.toContain(serviceTask);

  expect(handleGetTasks(serviceManager)).toContain(serviceTask);
  expect(handleGetTasks(serviceTM)).toContain(serviceTask);

  expect(() => {
    handleGetTask(productionTM, serviceTask.id);
  }).toThrow();

  expect(handleGetTask(serviceTM, serviceTask.id)).toBe(serviceTask);
});
