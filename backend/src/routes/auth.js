import express from "express";

import * as AuthController from "../controllers/auth";

const router = express.Router();

// Auth
router.route("/login").post(AuthController.loginController);

export default router;
