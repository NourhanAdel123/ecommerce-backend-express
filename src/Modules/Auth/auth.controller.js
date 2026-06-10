import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password, confirmPassword, phone, role } = req.body;
  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password doesn't match confirm password" });
    }
    const userCheck = await userModel.findOne({ email });
    if (userCheck) {
      res.status(409).json({ message: "email already exsist" });
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
  } catch (error) {
    res.json({ message: "failed to add user", error });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(409).json({ message: "email doesn't exsist" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "password is wrong" });
    }

    const userToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      user.role === "User"
        ? process.env.SECRET_KEY
        : process.env.ADMIN_TOKEN_KEY,
      {
        expiresIn: "2d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
