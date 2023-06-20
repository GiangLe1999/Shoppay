import { Coupon } from "@/models/Coupon";
import db from "@/utils/db";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await db.connectDb();
      const { coupon, startDate, endDate, discount } = req.body;
      const test = await Coupon.findOne({ coupon });

      if (test) {
        return res
          .status(400)
          .json({ message: "Coupon already exists, try with different name!" });
      }

      await new Coupon({
        coupon,
        startDate,
        endDate,
        discount,
      }).save();

      db.disConnectDb();

      return res.status(201).json({
        message: "Coupon created successfully!",
        coupons: await Coupon.find({}),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
