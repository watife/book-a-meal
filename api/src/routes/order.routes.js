import { Router } from "express";

// controllers
import OrderContoller from "../controllers/order.controller";
import AuthController from "../middlewares/authentication";
import OrderValidate from "../middlewares/order.middleware";
// import AuthController from "../middlewares/authentication";

const router = Router();

router.get(
  "/:id",
  AuthController.verifyUserToken,
  OrderContoller.fetchUserOrders
);
router.get("/", AuthController.verifyAdminToken, OrderContoller.fetchAllOrders);
router.post(
  "/",
  OrderValidate.validateOrder,
  AuthController.verifyUserToken,
  OrderContoller.addOrder
);
router.put(
  "/:id",
  OrderValidate.validateOrderUpdate,
  AuthController.verifyUserToken,
  OrderContoller.modifyOrder
);

router.put(
  "/status/:id",
  AuthController.verifyAdminToken,
  OrderContoller.updateStatus
);

// AuthController.verifyAdminToken
export default router;
