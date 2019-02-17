import { Router } from "express";

// controllers
import OrderController from "../controllers/order.controller";

const router = Router();

router.get("/:id", OrderController.fetchUserOrders);
router.get("/", OrderController.fetchAllOrders);
router.post("/", OrderController.addOrder);
router.put("/:id", OrderController.modifyOrder);

export default router;
