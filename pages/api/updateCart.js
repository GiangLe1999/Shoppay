import { Product } from "@/models/Product";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.connectDb();
      //Vòng lặp này sẽ về 1 mảng gồm các Promise
      const promises = req.body.products.map(async (p) => {
        let dbProduct = await Product.findById(p._id).lean();
        let originalPrice = dbProduct.subProducts[p.style].sizes.find(
          (x) => x.size === p.size
        ).price;
        let quantity = dbProduct.subProducts[p.style].sizes.find(
          (x) => x.size === p.size
        ).qty;
        let discount = dbProduct.subProducts[p.style].discount;

        return {
          ...p,
          priceBefore: originalPrice,
          price:
            discount > 0
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice,
          discount,
          quantity,
          shippingFee: dbProduct.shipping,
        };
      });

      db.disConnectDb();
      const data = await Promise.all(promises);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
