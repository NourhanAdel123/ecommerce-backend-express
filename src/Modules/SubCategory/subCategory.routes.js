import { Router } from "express";
import * as subCategoryController from "./subCategory.controller.js";

const router = Router({ mergeParams: true });
router.post("/add-subCategory", subCategoryController.add_subCategory);
router.get("/all", subCategoryController.get_all_subCategories);
router.patch("/update/:id", subCategoryController.update_subCategory);
router.delete("/delete/:_id", subCategoryController.delete_subCategory);

export default router;
