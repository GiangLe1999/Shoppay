import { User } from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.connectDb();
      const { user_id, address_id } = req.body;

      let user = await User.findById(user_id);

      const addresses = { ...user.toObject() }.address;

      const newAddresses = addresses.filter((a) => a._id != address_id);

      //Lưu ý phải có toObject để nhận về chính xác dạng Object
      await user.updateOne(
        {
          $pull: { address: { _id: address_id } },
        },
        { new: true }
      );

      res.json(newAddresses);

      await db.disConnectDb();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
