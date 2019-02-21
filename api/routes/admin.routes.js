import { Router } from "express";

// controllers
import AdminController from "../controllers/admin.controller";

const router = Router();

router.post("/", AdminController.adminSignUp);

export default router;
