import { Router } from "express";
import * as productController from "./product.cotroller.js";

const router = Router();
router.post("/add-product", productController.add_product);
router.get("/all-products", productController.get_Allproducts);
router.get("/:_id", productController.get_SingleProduct);
router.patch("/update-product/:_id", productController.update_product);
router.delete("/delete-product/:id", productController.delet_product);

export default router;
