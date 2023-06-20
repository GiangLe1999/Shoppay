import nc from "next-connect";

import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import db from "@/utils/db";
import { Product } from "@/models/Product";
import slugify from "slugify";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    if (req.body.parent) {
      const parent = await Product.findById(req.body.parent);
      if (!parent) {
        return res.status(404).json({ message: "Parent product not found." });
      } else {
        const newParent = await parent.updateOne({
          $push: {
            subProducts: {
              sku: req.body.sku,
              color: req.body.body,
              images: req.body.images,
              sizes: req.body.sizes,
              discount: req.body.discount,
            },
          },
        });
      }
    } else {
      req.body.slug = slugify(req.body.name, { lower: true });
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        questions: req.body.questions,
        slug: req.body.slug,
        category: req.body.category,
        subCategories: req.body.subCategories,
        subProduct: [
          {
            sku: req.body.sku,
            color: req.body.body,
            images: req.body.images,
            sizes: req.body.sizes,
            discount: req.body.discount,
          },
        ],
      });

      await newProduct.save();
      res.status(201).json({ message: "Product created successfully." });
    }

    await db.disConnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
