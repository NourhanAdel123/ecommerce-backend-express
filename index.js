import express from "express";
import { DBConnection } from "./src/DB/connection.js";
import { allRoutes } from "./src/index.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalErrorHandler } from "./src/utils/errorHandling.js";
import morgan from "morgan";

const app = express();
DBConnection();
app.use(express.json());
app.use(morgan("dev"));
app.use(allRoutes);

// handle invalid url
app.use((req, res, next) => {
  next(new AppError("invalid url or method", 404));
});

// global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
