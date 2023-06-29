import mongoose, { models, model } from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter your full name",
    },
    email: {
      type: String,
      required: "Please enter your email address",
      trim: true,
    },
    password: {
      type: String,
      required: "Please enter your password",
    },
    //  Role mặc định là user
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default: "/images/default-avt.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        style: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
