import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
import { User } from "@/models/User";
import db from "@/utils/db";
import { sendEmail } from "@/utils/sendEmails";
import { createResetToken } from "../../../utils/tokens";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect db & extract data
      await db.connectDb();
      const { email } = req.body;

      //   Tìm user trong database
      const user = await User.findOne({ email });

      if (!user) {
        //Nếu không có user trong database
        return res.status(400).json({
          message: "This email does not exist in our database",
        });
      }

      //   Nếu có user trong database
      const userId = createResetToken({
        id: user._id.toString(),
      });

      const url = `${process.env.BASE_URL}/auth/reset/${userId}`;

      const result = sendEmail(
        email,
        url,
        "",
        "Reset your password",
        resetEmailTemplate
      );

      await db.disConnectDb();

      res.json({
        message:
          "An email has been sent to you, use it to reset your password.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
