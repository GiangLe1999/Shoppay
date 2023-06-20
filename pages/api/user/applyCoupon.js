import Cart from "@/models/Cart";
import { Coupon } from "@/models/Coupon";
import { User } from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  try {
    const { coupon, user_id } = req.body;

    const user = await User.findById(user_id);
    const checkCoupon = await Coupon.findOne({ coupon });

    if (checkCoupon == null) {
      return res.json({ message: "Invalid coupon!" });
    }

    const { cartTotal } = await Cart.findOne({ user: user._id });

    let totalAfterDiscount =
      Number(cartTotal) -
      Number(cartTotal) * (Number(checkCoupon.discount) / 100);

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    res.json({
      totalAfterDiscount: Number(totalAfterDiscount.toFixed(2)),
      discount: Number(checkCoupon.discount),
    });

    db.disConnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
