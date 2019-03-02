import { Router } from "express";

// controllers
import MenuController from "../controllers/menu.controller";
import AuthController from "../middlewares/authentication";

console.log(MenuController);
console.log(AuthController);

const router = Router();

router.get("/", AuthController.verifyDoubleToken, MenuController.getTodayMenu);
router.get(
  "/history",
  AuthController.verifyAdminToken,
  MenuController.fetchAllMenu
);
router.post("/", AuthController.verifyAdminToken, MenuController.addTodayMenu);
// router.put("/", AuthController.verifyAdminToken, MenuController.modifyMenu);

export default router;
