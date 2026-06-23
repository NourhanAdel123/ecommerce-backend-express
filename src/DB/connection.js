import mongoose from "mongoose";

export const DBConnection = async () => {
  return await mongoose
    // .connect("mongodb://localhost:27017/ecommerce")
    .connect("mongodb://host.docker.internal:27017/ecommerce")
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log("failed to connect db");
    });
};
