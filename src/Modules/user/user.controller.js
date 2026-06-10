import { userModel } from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJs from "crypto-js";

export const get_use_profile = async (req, res, next) => {
  const user = req.user;
  try {
    user.phone = CryptoJs.AES.decrypt(
      user.phone,
      process.env.SECRET_KEY,
    ).toString(CryptoJs.enc.Utf8);

    res.json({ message: "user profile get successfully", user });
  } catch (error) {
    res.json({ message: "failed to get profile", error });
  }
};
