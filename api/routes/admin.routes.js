import { Router } from "express";

// controllers
import AdminController from "../controllers/admin.controller";

const router = Router();

router.post("/", AdminController.adminSignUp);
router.get("/:id", AdminController.getAdmin);
router.get("/", AdminController.getAllAdmin);
router.put("/:id", AdminController.modifyAnAdmin);
router.delete("/:id", AdminController.deleteAdmin);

export default router;
