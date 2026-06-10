import { Router } from "express";
import * as AUC from "./auth.controller.js";

const router = Router();
router.post("/register", AUC.register);
router.post("/login", AUC.login);
export default router;
