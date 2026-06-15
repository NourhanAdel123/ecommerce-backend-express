import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const authuntication = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new AppError("authorization header is missing", 401));
  }
  const [Bearer, token] = authorization.split(" ");
  let key = undefined;
  switch (Bearer) {
    case "Bearer":
      key = process.env.SECRET_KEY;
      break;
    case "Admin":
      key = process.env.ADMIN_TOKEN_KEY;
      break;
    default:
      return next(new AppError("invalid bearer prefix", 401));
  }

  const { _id, type } = jwt.verify(token, key);

  if (type && type !== "access") {
    return next(new AppError("Invalid token type", 403));
  }

  const user = await userModel.findById(_id);
  if (!user) {
    return next(new AppError("user not found", 404));
  }
  req.user = user;
  return next();
});
// (removed old authuntication block)

export const authorizaion = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (role !== req.user.role) {
      return next(new AppError("user unathorized", 403));
    }
    return next();
  });
};
