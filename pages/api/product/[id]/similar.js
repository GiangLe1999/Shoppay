import { Product } from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;
    const { category } = await Product.findById(id).select("category");
    const similarProducts = await Product.find({ category }).select(
      "slug subProducts"
    );

    const similarProductsArr = similarProducts
      .filter((x) => x._id.toString() !== id)
      .map((similarProduct) => ({
        slug: similarProduct.slug,
        image: similarProduct.subProducts[0].images[0].url,
      }));

    res.status(200).json(similarProductsArr);

    await db.disConnectDb();
  } catch (error) {
    await db.disConnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
