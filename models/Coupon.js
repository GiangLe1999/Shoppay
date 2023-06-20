import mongoose, { model, models } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Coupon = models.Coupon || model("Coupon", couponSchema);
