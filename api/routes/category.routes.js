import { Router } from "express";

// controllers
import CategoryController from "../controllers/category.controller";

const router = Router();

router.get("/", CategoryController.fetchAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.post("/", CategoryController.addACategory);
router.put("/:id", CategoryController.modifyCategory);
router.delete("/:id", CategoryController.deleteSingleCategory);

export default router;
