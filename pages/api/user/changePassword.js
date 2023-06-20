import auth from "@/middleware/auth";
import { User } from "@/models/User";
import db from "@/utils/db";
import bcrypt from "bcrypt";
import nc from "next-connect";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { current_password, password } = req.body;
    const user = await User.findById(req.user);

    //Password mới sau khi crypt
    const crypted_password = await bcrypt.hash(password, 12);

    //Trường hợp login bằng Social và ko có mật khẩu
    if (!user.password) {
      await user.updateOne({ password: crypted_password });

      return res.status(200).json({
        message:
          "We noticed that you are using a social login so we added a password to login with in the future.",
      });
    }

    //Trường hợp login bằng tài khoản
    //So khớp mk do người dùng nhập với mk lưu trong DB
    const isMatch = bcrypt.compare(current_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is wrong!" });
    }

    await user.updateOne({ password: crypted_password });

    await db.disConnectDb();

    return res
      .status(200)
      .json({ message: "Password has been changed successfully!" });
  } catch (error) {
    await db.disConnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
