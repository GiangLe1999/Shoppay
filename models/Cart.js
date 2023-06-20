import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: Number,
        shipping: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
