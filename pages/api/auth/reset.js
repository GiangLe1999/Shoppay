import { User } from "@/models/User";
import db from "@/utils/db";
import bcrypt from "bcrypt";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      // Connect db & extract data
      await db.connectDb();
      const { user_id, password } = req.body;

      const user = await User.findById(user_id);

      if (!user) {
        return res
          .status(400)
          .json({ message: "This account does not exist in our database." });
      }

      const cryptedPassword = await bcrypt.hash(password, 12);

      await User.updateOne({
        password: cryptedPassword,
      });

      await db.disConnectDb();

      res.json({
        message: { email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
