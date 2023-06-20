import nc from "next-connect";
import auth from "@/middleware/auth";
import db from "@/utils/db";
import { User } from "@/models/User";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { product_id, style } = req.body;

    //req.user do Middleware auth trả về
    const user = await User.findById(req.user);

    //Xác định xem trong wishlist hiện tại của user đã có sẵn product cần thêm vào wishlist chưa
    const exist = user.wishlist.find((x) => {
      return x.product.toString() == product_id && x.style == style;
    });

    //Nếu có rồi thì thoát hàm
    if (exist) {
      return res
        .status(400)
        .json({ message: "Product already exists in your wishlist." });
    }

    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    await db.disConnectDb();

    res
      .status(200)
      .json({ message: "Product successfully added to your wishlist." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
