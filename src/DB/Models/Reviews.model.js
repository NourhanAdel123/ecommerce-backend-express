import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    images: String,
  },
  { timeseries: true },
);
export const ReviewModel = mongoose.model("Reviews", ReviewSchema);
