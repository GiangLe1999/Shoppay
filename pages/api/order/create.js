import { Order } from "@/models/Order";
import { User } from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await db.connectDb();
      const {
        products,
        shippingAddress,
        paymentMethod,
        total,
        user_id,
        shippingPrice,
        totalBeforeDiscount,
        couponApplied,
      } = req.body;

      const user = await User.findById(user_id);
      const newOrder = await new Order({
        user: user._id,
        products,
        shippingAddress,
        shippingPrice,
        paymentMethod,
        total,
        totalBeforeDiscount,
        couponApplied,
      }).save();

      db.disConnectDb();

      return res.status(201).json({ order_id: newOrder._id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
