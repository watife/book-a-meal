import { Router } from "express";

// controllers
import MealController from "../controllers/meal.controller";

const router = Router();

router.get("/", MealController.fetchAllMeals);
router.get("/:id", MealController.getSingleMeal);
router.post("/", MealController.addAMeal);
router.put("/:id", MealController.modifyMeal);
router.delete("/:id", MealController.deleteSingleMeal);

export default router;
