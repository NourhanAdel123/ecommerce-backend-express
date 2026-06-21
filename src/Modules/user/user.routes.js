import * as UC from "./user.controller.js";
import { Router } from "express";
import { authorizaion, authuntication } from "../../middlewares/auth.middle.js";
import { userSchema } from "../../Modules/user/user.validation.js";
import * as US from "../user/user.validation.js";
import Validation from "../../middlewares/validation.middle.js";
import { multerFun } from "../../services/multerLocally.js";
import { validExtention } from "../../services/multerLocally.js";
import { multerCloudFun } from "../../services/multerCloudinary.js";

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

router.post(
  "/addProfile",
  multerFun(validExtention.image, "user/profile").single("profile"),
  UC.uploadProfileImage,
);

router.post(
  "/addFile",
  multerFun(validExtention.file, "user/files").single("file"),
  UC.uploadProfileImage,
);

router.post(
  "/addCloudinaryImage",
  authuntication,
  authorizaion("User"),
  multerCloudFun().single("profile"),
  UC.uploadCloudinaryImage,
);
router.patch("/update-address/:_id", UC.update_address);

export default router;
