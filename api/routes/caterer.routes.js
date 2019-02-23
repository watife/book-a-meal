import { Router } from "express";

// controllers
import CatererController from "../controllers/caterer.controller";

const router = Router();

router.post("/", CatererController.catererRegister);
router.post("/login", CatererController.catererLogin);
router.get("/:id", CatererController.getCaterer);
router.get("/", CatererController.getAllCaterer);
router.put("/:id", CatererController.modifyCaterer);
router.delete("/:id", CatererController.deleteCaterer);

export default router;
