import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [3, "username must be at least 3 charcaters Length"],
      maxlength: [15, "username must be at most 15 charcaters Length"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "not specified"],
        default: "not specified",
        message: "gender must be male or female",
      },
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ["User", "Admin"],
        default: "user",
        message: "role must be user or admin",
      },
      // enum: Object.values(RolesTypes),
      // default: RolesTypes.User,
    },
    phone: String,
    Address: String,
    img: {
      secure_url: String,
      public_id: String,
    },
    BOD: String,
    token: String,
    refreshToken: String,
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true },
);

export const userModel = mongoose.model("user", userSchema);
