import auth from "@/middleware/auth";
import { Product } from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const { id } = req.query;

    const product = await Product.findById(id);

    if (product) {
      // Kiểm tra liệu trước đây user đã review sản phẩm hiện tại hay chưa
      // req.user là _id của user, ta đã gán khi sử dung middleware auth
      const exist = product.reviews.find(
        (x) => x.reviewBy.toString() == req.user
      );

      // Nếu đã review trước đây rồi
      // Thực hiện update lại review đó dựa theo _id của product và id của review
      if (exist) {
        await Product.updateOne(
          { _id: id, "reviews._id": exist._id },
          {
            //Update lại nội dung review
            $set: {
              "reviews.$.review": req.body.review,
              "reviews.$.size": req.body.size,
              "reviews.$.fit": req.body.fit,
              "reviews.$.style": req.body.style,
              "reviews.$.feature": req.body.feature,
              "reviews.$.quality": req.body.quality,
              "reviews.$.rating": req.body.rating,
              "reviews.$.images": req.body.images,
            },
          },
          { new: true }
        );

        //Update lại số lượng reviews và điểm trung bình rating của sản phẩm
        const updatedProduct = await Product.findById(id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
          updatedProduct.reviews.length;

        await updatedProduct.save();
        //Điền thông tin trường reviewBy trước khi trả data về Frontend
        await updatedProduct.populate("reviews.reviewBy");

        await db.disConnectDb();

        return res
          .status(200)
          .json({ reviews: updatedProduct.reviews.reverse() });
        //Khi trước đây chưa review về product, tiến hành tạo mới review
      }
      //Nếu user chưa từng review về sản phẩm thì tạo mới Review
      else {
        const review = {
          reviewBy: req.user,
          rating: req.body.rating,
          review: req.body.review,
          size: req.body.size,
          fit: req.body.fit,
          style: req.body.style,
          images: req.body.images,
          feature: req.body.feature,
          quality: req.body.feature,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => a + c.rating, 0) /
          product.reviews.length;

        await product.save();
        await product.populate("reviews.reviewBy");

        await db.disConnectDb();
        return res.status(200).json({ reviews: product.reviews.reverse() });
      }
    }
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
