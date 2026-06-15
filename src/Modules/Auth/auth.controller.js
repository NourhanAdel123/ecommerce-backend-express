import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import { registerSchema } from "./auth.validation.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword, phone, role } = req.body;
  if (password !== confirmPassword) {
    return next(new AppError("password doesn't match confirm password", 400));
  }
  const userCheck = await userModel.findOne({ email });
  if (userCheck) {
    return next(new AppError("email already exsist", 409));
  }
  const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  const hashPhone = CryptoJs.AES.encrypt(
    phone,
    process.env.SECRET_KEY,
  ).toString();

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    phone: hashPhone,
    role,
  });

  res.status(201).json({ message: "user created successfully", user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("email doesn't exsist", 409));
  }
  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    return next(new AppError("password is wrong", 401));
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      type: "access"
    },
    user.role === "User"
      ? process.env.SECRET_KEY
      : process.env.ADMIN_TOKEN_KEY,
    {
      expiresIn: "1h",
    },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      type: "refresh"
    },
    user.role === "User"
      ? process.env.SECRET_KEY
      : process.env.ADMIN_TOKEN_KEY,
    {
      expiresIn: "7d",
    },
  );

  user.refreshToken = refreshToken;
  await user.save();

  return res.status(200).json({
    message: "Login successful",
    accessToken,
    refreshToken,
  });
});

export const refreshUserToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new AppError("Refresh token is required", 400));
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    return next(new AppError("Invalid refresh token", 403));
  }

  const secretKey = user.role === "User" ? process.env.SECRET_KEY : process.env.ADMIN_TOKEN_KEY;
  
  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) {
      return next(new AppError("Refresh token expired or invalid", 403));
    }

    if (decoded.type !== "refresh") {
      return next(new AppError("Invalid token type", 403));
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        type: "access"
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  });
});
