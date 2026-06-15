import { Router } from "express";
import * as AUC from "./auth.controller.js";
import Validation from "../../middlewares/validation.middle.js";
import * as ValidationSchema from "./auth.validation.js";

const router = Router();
router.post(
  "/register",
  Validation(ValidationSchema.registerSchema),
  AUC.register,
);
router.post("/login", AUC.login);
router.post("/refreshToken", AUC.refreshUserToken);
export default router;
