import { User } from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  try {
    await db.connectDb();
    const { user_id, address_id } = req.body;

    let user = await User.findById(user_id);

    let addresses = [];

    if (req.method === "PUT") {
      //Lưu ý phải có toObject để nhận về chính xác dạng Object
      for (let i = 0; i < user.address.length; i++) {
        let temp_address = {};
        if (user.address[i]._id == address_id) {
          temp_address = { ...user.address[i].toObject(), active: true };

          //Dùng unshift để đẩy lên đầu mảng
          addresses.unshift(temp_address);
        } else {
          temp_address = { ...user.address[i].toObject(), active: false };

          //Dùng push để đẩy xuống cuối mảng
          addresses.push(temp_address);
        }
      }

      await user.updateOne({ address: addresses }, { new: true });
    }

    res.json(addresses);

    await db.disConnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
