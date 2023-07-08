import nc from "next-connect";
import auth from "@/middleware/auth";
import db from "@/utils/db";
import { User } from "@/models/User";
import { Product } from "@/models/Product";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { productIds } = req.body;

    const products = await Product.find({ _id: productIds }).select(
      "name subProducts slug"
    );

    res.status(200).json(products);
    await db.disConnectDb();
  } catch (error) {}
});

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { product_id, style, size } = req.body;

    //req.user do Middleware auth trả về
    const user = await User.findById(req.user);

    //Xác định xem trong wishlist hiện tại của user đã có sẵn product cần thêm vào wishlist chưa
    const exist = user.wishlist.find((x) => {
      return (
        x.product.toString() == product_id && x.style == style && x.size == size
      );
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
          size,
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
