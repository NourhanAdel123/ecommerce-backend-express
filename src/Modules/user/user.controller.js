import { userModel } from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJs from "crypto-js";
import { asyncHandler } from "../../utils/errorHandling.js";
import cloudinary from "../../services/cloudinary.js";

import bcrypt from "bcrypt";
import { redisClient } from "../../redisConfig/redis.js";

export const get_use_profile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  user.phone = CryptoJs.AES.decrypt(
    user.phone,
    process.env.SECRET_KEY,
  ).toString(CryptoJs.enc.Utf8);

  res.json({ message: "user profile get successfully", user });
});

export const change_password = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;

    const comparePass = await bcrypt.compare(oldPassword, req.user.password);

    if (!comparePass) {
      return next(new Error("Old password is incorrect", { cause: 400 }));
    }

    const hashNewPass = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    await userModel.findByIdAndUpdate(req.user._id, {
      password: hashNewPass,
      changeCredentialTime: Date.now(),
    });

    return res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = (req, res, next) => {
  try {
    res
      .status(201)
      .json({ message: "file uploaded successfully", file: req.file });
  } catch (error) {
    return next(error);
  }
};

export const uploadCloudinaryImage = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (!req.file) {
      return next(new Error("please upload your profile picture"));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `user/images`,
      },
    );

    const user = await userModel.findByIdAndUpdate(
      { _id },
      {
        img: {
          secure_url,
          public_id,
        },
      },
    );

    res.status(201).json({
      message: "file uploaded successfully",
      file: { secure_url, public_id },
    });
  } catch (error) {
    return next(error);
  }
};

export const update_address = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id },
      {
        $addToSet: { Address: req.body },
      },
      { new: true },
    );
    res.status(201).json({ message: "address updated successfully", user });
  } catch (error) {
    return next(error);
  }
};

export const delete_address = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id },
      {
        $pull: { Address: { _id: req.body.address } },
      },
      { new: true },
    );
    res.status(201).json({ message: "address updated successfully", user });
  } catch (error) {
    return next(error);
  }
};

export const get_all_users = async (req, res, next) => {
  if (redisClient.isOpen) {
    const cachedUsers = await redisClient.get("users:all");
    if (cachedUsers) {
      const pardedData = JSON.parse(cachedUsers);
      res.status(201).json({
        source: "redus cache",
        count: pardedData,
        parsedData: pardedData,
      });
    }
  }
  const users = await userModel.find();
  if (redisClient.isOpen) {
    await redisClient.setEx("user:all", 50, JSON.stringify(users));
  }
  res.status(201).json({ message: "all", users });
};
