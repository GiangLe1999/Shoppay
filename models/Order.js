import mongoose, { model, models } from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", require: true },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: { type: String },
        image: { type: String },
        size: { type: String },
        qty: { type: Number },
        color: {
          color: String,
          image: String,
        },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: String,
      status: String,
      email: String,
    },
    total: {
      type: Number,
      required: true,
    },
    totalBeforeDiscount: {
      type: Number,
    },
    couponApplied: {
      type: String,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "Not processed",
      //enum chỉ cho phép 1 trong các value thuộc mảng
      enum: [
        "Not processed",
        "Processing",
        "Dispatched",
        "Canceled",
        "Completed",
      ],
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", orderSchema);
