import { Order } from "@/models/Order";
import db from "@/utils/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.connectDb();

      const order_id = req.query.id;
      const { amount, id } = req.body;

      const payment = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "USD",
        description: "Shoppay store",
        payment_method: id,
        confirm: true,
      });

      const order = await Order.findById(order_id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: payment.id,
          status: payment.status,
          email_address: payment.email_address,
        };
        await order.save();

        db.disConnectDb();

        res.json({ success: true });
      } else {
        db.disConnectDb();
        return res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      db.disConnectDb();
      return res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
