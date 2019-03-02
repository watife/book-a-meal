import { Router } from "express";

// controllers
import MealController from "../controllers/meal.controller";
import AuthController from "../middlewares/authentication";

const router = Router();

router.get("/", AuthController.verifyAdminToken, MealController.fetchAllMeals);
router.get(
  "/:id",
  AuthController.verifyAdminToken,
  MealController.getSingleMeal
);
router.post("/", AuthController.verifyAdminToken, MealController.addAMeal);
router.put("/:id", AuthController.verifyAdminToken, MealController.modifyMeal);
router.delete(
  "/:id",
  AuthController.verifyAdminToken,
  MealController.deleteSingleMeal
);

export default router;
