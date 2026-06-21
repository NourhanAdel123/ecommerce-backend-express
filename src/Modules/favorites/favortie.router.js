import { Router } from "express";
import * as FavoriteController from "./favorite.controller.js";

const router = Router();
router.post("/add-favorite/:id", FavoriteController.add_to_favorite);
router.get("/all-favorite/:_id", FavoriteController.get_all_favorite);

router.delete("/delete-favorite/:id", FavoriteController.delete_from_favorites);

router.get("/:_id", FavoriteController.generate_qr);

export default router;
