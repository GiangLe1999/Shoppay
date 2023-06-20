import { Order } from "@/models/Order";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await db.connectDb();

      console.log(req.body);

      const order_id = req.query.id;

      const order = await Order.findById(order_id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.details.id,
          status: req.body.details.status,
          email_address: req.body.details.email_address,
        };
      }

      const newOrder = await order.save();

      db.disConnectDb();

      res.json({ message: "Order is paid", order: newOrder });
    } catch (error) {
      db.disConnectDb();
      return res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
