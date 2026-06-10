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

// handle invalid url
app.use((req, res) => {
  res.json({ message: "invalid url or method" });
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
