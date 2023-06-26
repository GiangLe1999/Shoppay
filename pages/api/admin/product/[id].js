import nc from "next-connect";

import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import { Product } from "@/models/Product";
import db from "@/utils/db";

const handler = nc().use(auth).use(admin);

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    const productId = req.query?.id;

    const product = await Product.findById(productId).lean();

    console.log(product);

    if (!product) {
      res.status(404).json({ message: "Product not found!" });
    }
    await db.disConnectDb();

    res.status(200).json({
      _id: product._id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
