import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
import { User } from "@/models/User";
import db from "@/utils/db";
import { sendEmail } from "@/utils/sendEmails";
import { validateEmail } from "@/utils/validation";
import bcrypt from "bcrypt";

import { createActivationToken } from "../../../utils/tokens";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect db & extract data
      await db.connectDb();
      const { full_name, email, password } = req.body;

      // Kiểm tra input value phải tồn tại
      if (!full_name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }

      // Kiểm tra tính hợp lệ của cú pháp email
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
      }

      // Kiểm tra tính trùng lặp của email
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "This email already exists" });
      }

      //Kiểm tra độ dài password
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      // Sau khi thoả mãn các điều kiện trên, tiến hành tạo user
      const cryptedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name: full_name,
        email,
        password: cryptedPassword,
      });

      const activation_token = createActivationToken({
        id: newUser._id.toString(),
      });

      const activation_url = `${process.env.BASE_URL}/activate/${activation_token}`;
      sendEmail(
        email,
        activation_url,
        "",
        "Activate your account",
        activateEmailTemplate
      );

      await db.disConnectDb();

      res.json({
        message: "Register success! Please activate your email to start.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
