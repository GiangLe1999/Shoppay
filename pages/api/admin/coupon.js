import { Category } from "@/models/Category";
import { Coupon } from "@/models/Coupon";
import { SubCategory } from "@/models/SubCategory";
import db from "@/utils/db";
import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";

const handler = nextConnect().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { coupon, discount, startDate, endDate } = req.body;

    const test = await Coupon.findOne({ coupon });

    if (test) {
      return res.status(400).json({
        message: "Coupon already exists, try a different coupon.",
      });
    }

    await new Coupon({ coupon, discount, startDate, endDate }).save();

    db.disConnectDb();

    res.status(201).json({
      message: `Coupon ${coupon} has been created successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;

    await Coupon.findByIdAndRemove(id);

    db.disConnectDb();

    return res.json({
      message: "Coupon has been deleted successfully.",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, coupon, startDate, endDate, discount } = req.body;

    await db.connectDb();

    await Coupon.findByIdAndUpdate(id, {
      coupon,
      startDate,
      discount,
      endDate,
    });

    await db.disConnectDb();

    res.json({
      message: `Coupon has been updated successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
