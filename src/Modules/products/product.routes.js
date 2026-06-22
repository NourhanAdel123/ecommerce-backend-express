import { Router } from "express";
import * as productController from "./product.cotroller.js";
console.log("product router loaded");
const router = Router();
router.post("/add-product", productController.add_product);
router.get("/", productController.get_all_products);
router.patch("/update-product/:_id", productController.update_product);
router.delete("/delete-product/:id", productController.delet_product);
router.get("/:_id", productController.get_SingleProduct);

export default router;
