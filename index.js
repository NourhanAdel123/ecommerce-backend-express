import express from "express";
import userRouter from "./src/Modules/user/user.routes.js";
import authRouter from "./src/Modules/Auth/auth.routes.js";
import { DBConnection } from "./src/DB/connection.js";
// import { config } from "dotenv";
// config();
const app = express();
DBConnection();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

import { globalErrorHandler } from "./src/utils/errorHandling.js";
import { AppError } from "./src/utils/AppError.js";

// handle invalid url
app.use((req, res, next) => {
  next(new AppError("invalid url or method", 404));
});

// global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
