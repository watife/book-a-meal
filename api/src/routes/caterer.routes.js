import { Router } from "express";

// controllers
import CatererController from "../controllers/caterer.controller";

// import validations

import AuthValidate from "../middlewares/authvalidate.middleware";
// import AuthController from "../middlewares/authentication";

const router = Router();

router.post(
  "/",
  AuthValidate.validateRegister,
  //   AuthController.verifyAdminToken,
  CatererController.catererRegister
);
router.post(
  "/login",
  AuthValidate.validateLogin,
  CatererController.catererLogin
);
// router.get(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.getCaterer
// );
// router.get(
//   "/",
//   AuthController.verifyAdminToken,
//   CatererController.getAllCaterer
// );
// router.put(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.modifyCaterer
// );
// router.delete(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.deleteCaterer
// );

export default router;
