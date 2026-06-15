import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    image: {
      type: String, // Store image URL or file path
      required: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      required: true,
      min: 0,
    },
    Brand: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    Subcategory: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    Category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    ratingsAvg: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const productModel = model("product", productSchema);
