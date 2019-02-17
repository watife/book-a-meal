import { Router } from "express";

// controllers
import MenuController from "../controllers/menu.controller";

const router = Router();

router.get("/", MenuController.fetchTodayMenu);
router.get("/history", MenuController.fetchAllMenu);
router.post("/", MenuController.addTodayMenu);
router.put("/", MenuController.modifyMenu);

export default router;
