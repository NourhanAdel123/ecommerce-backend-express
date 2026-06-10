import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/user.model.js";

export const authuntication = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    // console.log(authorizaion);
    const [Bearer, token] = authorization.split(" ");
    let key = undefined;
    switch (Bearer) {
      case "Bearer":
        key = process.env.SECRET_KEY;
        break;
      case "Admin":
        key = process.env.ADMIN_TOKEN_KEY;
        break;
    }
    console.log(key);
    console.log(token);

    const { _id } = jwt.verify(token, key);

    const user = await userModel.findById(_id);
    if (!user) {
      return res.json({ message: "user not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    res.json({ message: "auth middleware error", error });
  }
};

export const authorizaion = (role) => {
  return (req, res, next) => {
    try {
      if (role !== req.user.role) {
        return res.json({ message: "user unathorized" });
      }
      return next();
    } catch (error) {
      res.json({ messag: "error in authorization", error });
    }
  };
};
