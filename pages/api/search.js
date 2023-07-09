import { Product } from "@/models/Product";
import db from "@/utils/db";

function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return searchHandler(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

const searchHandler = async (req, res) => {
  try {
    const { query } = req.query;
    await db.connectDb();

    let products = [];
    if (query.trim()) {
      products = await Product.find({
        name: { $regex: query, $options: "i" },
      })
        .select("name slug subProducts")
        .limit(5);
    }

    await db.disConnectDb();

    res.status(200).json(products);
  } catch (error) {
    await db.disConnectDb();
    res.status(500).json({ message: error.message });
  }
};

export default handler;
