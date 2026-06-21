import express from "express";
import userRouter from "./Modules/user/user.routes.js";
import authRouter from "./Modules/Auth/auth.routes.js";
import categoryRouter from "./Modules/Category/category.routes.js";
import subCategoryRouter from "./Modules/SubCategory/subCategory.routes.js";
import productRouter from "./Modules/products/product.routes.js";
import brandRouter from "./Modules/Brand/brand.routes.js";
import reviewRouter from "./Modules/reviews/review.router.js";
import favoriteRouter from "./Modules/favorites/favortie.router.js";
import { globalErrorHandler } from "./utils/errorHandling.js";
import { AppError } from "./utils/AppError.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/product", productRouter);
router.use("/brand", brandRouter);
router.use("/review", reviewRouter);
router.use("/favorite", favoriteRouter);

router.use(globalErrorHandler);

router.use((req, res, next) => {
  next(new AppError("invalid url or method", 404));
});
export const allRoutes = router;
