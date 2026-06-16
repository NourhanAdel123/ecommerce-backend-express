import { Router } from "express";
import * as brandController from "./brand.controller.js";

const router = Router();
router.post("/add-brand", brandController.add_brand);
router.get("get-all-brands", brandController.get_AllBrands);
router.get("specific-brand/:_id", brandController.get_SingleBrand);
router.patch("update-brand/:_id", brandController.update_brand);
router.delete("delete-brand/:_id", brandController.delet_brand);

export default router;
