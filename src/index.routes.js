import express from "express";
import userRouter from "./Modules/user/user.routes.js";
import authRouter from "./Modules/Auth/auth.routes.js";
import categoryRouter from "./Modules/Category/category.routes.js";
import subCategoryRouter from "./Modules/SubCategory/subCategory.routes.js";
import { globalErrorHandler } from "./utils/errorHandling.js";
import { AppError } from "./utils/AppError.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);

router.use(globalErrorHandler);

router.use((req, res, next) => {
  next(new AppError("invalid url or method", 404));
});
export const allRoutes = router;
