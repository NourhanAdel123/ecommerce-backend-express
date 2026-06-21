import mongoose, { Schema } from "mongoose";

const CoponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    disCount: {
      type: Number,
      required: true,
      min: 0,
    },
  },

  { timeseries: true },
);
export const CoponModel = mongoose.model("Copons", CoponSchema);
