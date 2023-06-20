import Cart from "@/models/Cart";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.connectDb();

      const { cart, user_id } = req.body;
      const products = [];
      let cartTotal = 0;

      //Tìm user
      let user = await User.findById(user_id);

      //Tìm dữ liệu Cart hiện có của user
      let existing_cart = await Cart.findOne({ user: user._id });

      //Nếu có dữ liệU cart thì remove toàn bộ
      if (existing_cart) {
        await Cart.deleteOne(existing_cart);
      }

      for (let i = 0; i < cart.length; i++) {
        let dbProduct = await Product.findById(cart[i]._id).lean();

        //Style lưu dưới dạng number
        let subProduct = dbProduct.subProducts[cart[i].style];
        let tempProduct = {};
        tempProduct.name = dbProduct.name;
        tempProduct.product = dbProduct._id;
        tempProduct.color = {
          color: cart[i].color.color,
          image: cart[i].color.image,
        };
        tempProduct.image = subProduct.images[0].url;
        tempProduct.qty = Number(cart[i].qty);
        tempProduct.size = cart[i].size;
        let price = Number(
          subProduct.sizes.find((p) => p.size == cart[i].size).price
        );
        tempProduct.shipping = Number(dbProduct.shipping);
        tempProduct.price =
          subProduct.discount > 0
            ? (price - (price * Number(subProduct.discount)) / 100).toFixed(2)
            : price.toFixed(2);

        products.push(tempProduct);
      }

      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].qty;
      }

      await new Cart({
        products,
        cartTotal: cartTotal.toFixed(2),
        user: user_id,
      }).save();

      res.status(201).json({ message: "Save cart successfully" });

      await db.disConnectDb();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
