import { Router } from "express";
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../SubCategory/subCategory.routes.js";
const router = Router();

router.use("/:id/subcategory", subCategoryRouter);
router.post("/addCategory", categoryController.add_category);
router.get("/all", categoryController.get_all_categories);
router.patch("/update/:id", categoryController.update_category);
router.delete("/delete/:_id", categoryController.delete_category);

export default router;
