import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";
import db from "@/utils/db";
import nextConnect from "next-connect";
import slugify from "slugify";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";

const handler = nextConnect().use(auth).use(admin);

handler.get(async (req, res) => {
  try {
    await db.connectDb();

    const { category } = req.query;

    if (!category) {
      return res.json([]);
    }

    const results = await SubCategory.find({ parent: category }).select("name");

    await db.disConnectDb();

    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, parent } = req.body;

    const test = await SubCategory.findOne({ name });

    if (test) {
      return res.status(400).json({
        message: "Sub-Category already exists, try a different name.",
      });
    }

    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disConnectDb();

    res.status(201).json({
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 }),
      message: `Sub-Category ${name} has been created successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;

    await SubCategory.findByIdAndRemove(id);

    db.disConnectDb();

    return res.json({
      message: "Sub-Category has been deleted successfully.",
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;

    await db.connectDb();

    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });

    await db.disConnectDb();

    return res.json({
      message: "Sub-Category has been updated successfully.",
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
