import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/errorHandling.js";

/* ---------------- REGISTER ---------------- */
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword, phone, role } = req.body;

  if (password !== confirmPassword) {
    return next(new AppError("password mismatch", 400));
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return next(new AppError("email already exists", 409));
  }

  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  const encryptedPhone = CryptoJs.AES.encrypt(
    phone,
    process.env.JWT_SECRET,
  ).toString();

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    phone: encryptedPhone,
    role,
  });

  res.status(201).json({
    message: "user created successfully",
    user,
  });
});

/* ---------------- LOGIN ---------------- */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("email not found", 404));
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new AppError("wrong password", 401));
  }

  const secret =
    user.role === "Admin"
      ? process.env.ADMIN_JWT_SECRET
      : process.env.JWT_SECRET;

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      type: "access",
    },
    secret,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      type: "refresh",
    },
    secret,
    { expiresIn: "7d" },
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    message: "login successful",
    accessToken,
    refreshToken,
  });
});

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshUserToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError("refresh token required", 400));
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    return next(new AppError("invalid refresh token", 403));
  }

  const secret =
    user.role === "Admin"
      ? process.env.ADMIN_JWT_SECRET
      : process.env.JWT_SECRET;

  jwt.verify(refreshToken, secret, (err, decoded) => {
    if (err) {
      return next(new AppError("refresh token expired", 403));
    }

    if (decoded.type !== "refresh") {
      return next(new AppError("invalid token type", 403));
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        type: "access",
      },
      secret,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "token refreshed",
      accessToken: newAccessToken,
    });
  });
});
