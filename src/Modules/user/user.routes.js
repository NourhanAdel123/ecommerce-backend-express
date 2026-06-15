import * as UC from "./user.controller.js";
import { Router } from "express";
import { authorizaion, authuntication } from "../../middlewares/auth.middle.js";
import { userSchema } from "../../Modules/user/user.validation.js";
import * as US from "../user/user.validation.js";
import Validation from "../../middlewares/validation.middle.js";

const router = Router();

router.get(
  "/profile",
  authuntication,
  authorizaion("Admin"),
  UC.get_use_profile,
);

router.patch(
  "/changepassword",
  authuntication,
  authorizaion("User"),
  Validation(userSchema),
  UC.change_password,
);

export default router;
