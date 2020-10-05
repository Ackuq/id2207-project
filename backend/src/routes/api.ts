import express from "express";
import * as UserController from "../controllers/User";
import * as EventRequestController from "../controllers/EventRequest";
import * as EventProjectController from "../controllers/EventProject";
import * as TaskController from "../controllers/Tasks";

const router = express.Router();

// Event requests
router.route("/eventRequest").post(EventRequestController.createEventRequest);
router.route("/eventRequest").get(EventRequestController.getEventRequests);
router.route("/eventRequest/:id").get(EventRequestController.getEventRequest);
router.route("/eventRequest/:id").put(EventRequestController.editEventRequest);
router
  .route("/eventRequest/:id")
  .delete(EventRequestController.deleteEventRequest);

// User requests
router.route("/me").get(UserController.getMe);
router.route("/user/subTeam").get(UserController.getSubTeam);
router.route("/user/:id").get(UserController.getUser);

// Event project
router.route("/eventProject").get(EventProjectController.getEventProjects);
router
  .route("/eventProject/:id")
  .delete(EventProjectController.deleteEventProject);
router.route("/eventProject/:id").put(EventProjectController.editEventProject);
router.route("/eventProject/:id").get(EventProjectController.getEventProject);

// Tasks
router.route("/eventProject/:id/task").post(TaskController.createTask);
router.route("/eventProject/:id/task").get(TaskController.getEventTasks);
router.route("/task").get(TaskController.getTasks);
router.route("/task/:id").get(TaskController.getTask);

export default router;
