import auth from "@/middleware/auth";
import { User } from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().use(auth);

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    const user = await User.findById(req.user);

    await db.disConnectDb();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed in attempting to get user information!" });
  }
});

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { name, ava } = req.body;

    await User.findByIdAndUpdate(req.user, { name, image: ava });

    db.disConnectDb();
    res.status(200).json(await User.findById(req.user));
  } catch (error) {
    await db.disConnectDb();
    res
      .status(500)
      .json({ message: "Failed in attempting to update user information!" });
  }
});

export default handler;
