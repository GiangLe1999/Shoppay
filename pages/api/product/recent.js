import auth from "@/middleware/auth";
import { Product } from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    const { ids } = req.body;

    await db.connectDb();

    const recentProducts = await Product.find({ _id: ids })
      .select("category name rating slug subProducts _id shipping")
      .lean();

    const reduceImagesProducts = recentProducts.map((p) => {
      const newSubProducts = p.subProducts.map((s) => {
        return { ...s, images: s.images.slice(0, 2) };
      });

      return { ...p, subProducts: newSubProducts };
    });

    await db.disConnectDb();

    res.status(200).json(reduceImagesProducts);
  } catch (error) {
    await db.disConnectDb();
    res.status(200).json({ message: error.message });
  }
});

export default handler;
