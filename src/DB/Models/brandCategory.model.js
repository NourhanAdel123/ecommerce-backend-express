import { Schema, model } from "mongoose";

const brandCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    logo: {
      type: String, // Store image URL or file path
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const brandCategoryModel = model("Brand", brandCategorySchema);
