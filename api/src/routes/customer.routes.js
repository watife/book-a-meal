import { Router } from "express";

// controllers
import CustomerController from "../controllers/customer.controller";

const router = Router();

router.post("/signup", CustomerController.customerRegister);
router.post("/login", CustomerController.customerLogin);
router.get("/:id", CustomerController.getCustomer);
// router.get("/", CustomerController.getAllCaterer);
// router.put("/:id", CustomerController.modifyCaterer);
// router.delete("/:id", CustomerController.deleteCaterer);

export default router;
