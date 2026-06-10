import * as UC from "./user.controller.js";
import { Router } from "express";
import { authorizaion, authuntication } from "../../middlewares/auth.middle.js";

const router = Router();

router.get(
  "/profile",
  authuntication,
  authorizaion("Admin"),
  UC.get_use_profile,
);

export default router;
