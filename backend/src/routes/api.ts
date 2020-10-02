import express from "express";
import * as UserController from "../controllers/user";
import * as EventRequestController from "../controllers/eventRequest";

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

export default router;
