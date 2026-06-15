import { userModel } from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJs from "crypto-js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const get_use_profile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  user.phone = CryptoJs.AES.decrypt(
    user.phone,
    process.env.SECRET_KEY,
  ).toString(CryptoJs.enc.Utf8);

  res.json({ message: "user profile get successfully", user });
});
