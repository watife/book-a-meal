import { Router } from "express";

// controllers
import CategoryController from "../controllers/category.controller";
import AuthController from "../middlewares/authentication";

const router = Router();

router.get(
  "/",
  AuthController.verifyAdminToken,
  CategoryController.fetchAllCategories
);
router.get(
  "/:id",
  AuthController.verifyAdminToken,
  CategoryController.getSingleCategory
);
router.post(
  "/",
  AuthController.verifyAdminToken,
  CategoryController.addACategory
);
router.put(
  "/:id",
  AuthController.verifyAdminToken,
  CategoryController.modifyCategory
);
router.delete(
  "/:id",
  AuthController.verifyAdminToken,
  CategoryController.deleteSingleCategory
);

export default router;
