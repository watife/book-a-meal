import { Router } from "express";

// controllers
import MenuController from "../controllers/menu.controller";
import AuthController from "../middlewares/authentication";
import MenuValidate from "../middlewares/menu.middleware";

const router = Router();

router.get("/", AuthController.verifyDoubleToken, MenuController.getTodayMenu);
router.get(
  "/history",
  AuthController.verifyAdminToken,
  MenuController.fetchAllMenu
);
router.post(
  "/",
  AuthController.verifyAdminToken,
  MenuValidate.validateMenu,
  MenuController.addTodayMenu
);
// router.put("/", AuthController.verifyAdminToken, MenuController.modifyMenu);

export default router;
