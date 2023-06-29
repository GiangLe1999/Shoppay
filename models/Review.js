import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

export const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    reviewBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    style: {
      color: String,
      colorImg: String,
    },
    fit: {
      type: String,
    },
    feature: { type: String },
    quality: { type: String },
    images: [],
    likes: [],
  },
  { timestamps: true }
);
export const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);
