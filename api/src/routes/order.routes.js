import { Router } from "express";

// controllers
import OrderContoller from "../controllers/order.controller";

const router = Router();

router.get("/:id", OrderContoller.fetchUserOrders);
router.get("/", OrderContoller.fetchAllOrders);
router.post("/", OrderContoller.addOrder);
router.put("/:id", OrderContoller.modifyOrder);

export default router;
