import { Router } from "express";
import * as ReviewController from "./review.controller.js";

const router = Router();
router.post("/add-review", ReviewController.add_review);
router.get("/all-reviews", ReviewController.all_review);
router.get("/:_id", ReviewController.get_specific_reviews);
router.patch("/update-review/:_id", ReviewController.update_review);
router.delete("/delete-review/:id", ReviewController.delete_review);

export default router;
