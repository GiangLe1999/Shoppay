import { Category } from "@/models/Category";
import db from "@/utils/db";
import nextConnect from "next-connect";
import slugify from "slugify";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";

// Dùng middleware auth để xác thực người dùng đã đăng nhập
// Đồng thời có thể gắn cho req propperty user bằng với id của người dùng gửi request
const handler = nextConnect().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name } = req.body;

    const test = await Category.findOne({ name });

    //Nếu category đã tồn tại, trả về lỗi
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exists, try a different name." });
    }

    await new Category({ name, slug: slugify(name) }).save();

    db.disConnectDb();

    res.status(201).json({
      categories: await Category.find({}).sort({ updatedAt: -1 }),
      message: `Category ${name} has been created successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;

    await Category.findByIdAndRemove(id);

    db.disConnectDb();

    return res.json({
      message: "Category has been deleted successfully.",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;

    await db.connectDb();

    await Category.findByIdAndUpdate(id, { name, slug: slugify(name) });

    await db.disConnectDb();

    return res.json({
      message: "Category has been updated successfully.",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
