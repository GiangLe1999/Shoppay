import auth from "@/middleware/auth";
import { User } from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { paymentMethod } = req.body;
    const user = await User.findById(req.user);

    await user.updateOne(
      { defaultPaymentMethod: paymentMethod },
      { returnOriginal: false }
    );

    await db.disConnectDb();

    res.status(200).json({ paymentMethod: user.defaultPaymentMethod });
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
