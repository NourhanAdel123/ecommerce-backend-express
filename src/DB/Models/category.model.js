import { Schema, model } from "mongoose";

const categorySchema = new Schema(
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
    image: {
      type: String, // Store image URL or file path
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model("Category", categorySchema);
