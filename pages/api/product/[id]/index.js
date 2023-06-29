import { Product } from "@/models/Product";
import db from "@/utils/db";

async function handler(req, res) {
  try {
    await db.connectDb();

    const id = req.query?.id;
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.method === "GET") {
      const style = req.query.style || 0;
      const size = req.query.size || 0;
      let discount = product.subProducts[style].discount;
      let priceBefore = product.subProducts[style].sizes[size]?.price;
      let priceAfter = priceBefore - (priceBefore * discount) / 100;
      let price = discount > 0 ? priceAfter : priceBefore;

      db.disConnectDb();

      return res.status(200).json({
        _id: product._id,
        style: Number(style),
        name: product.name,
        description: product.description,
        slug: product.slug,
        sku: product.subProducts[style].sku,
        brand: product.brand,
        category: product.category,
        subCategories: product.subCategories,
        shipping: product.shipping,
        images: product.subProducts[style].images,
        color: product.subProducts[style].color,
        size: product.subProducts[style].sizes[size]?.size,
        price,
        priceBefore,
        quantity: product.subProducts[style].sizes[size]?.qty,
      });
    }
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
