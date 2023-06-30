import auth from "@/middleware/auth";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { User } from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;

    const reviews = await Review.find({ product: id }).populate("reviewBy");

    await db.disConnectDb();
    return res.status(200).json(reviews);
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    await db.connectDb();

    const id = req.query?.id;
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { filter } = req.body;
    const { order, rating, size, style } = filter;

    const ratingOptions =
      rating && rating !== "all"
        ? { rating: Number(rating) }
        : rating === "all"
        ? {}
        : {};

    const sizeOptions =
      size && size !== "all" ? { size: size } : rating === "all" ? {} : {};

    let styleOptions =
      style.color && !style.colorImg
        ? { "style.color": style.color }
        : !style.color && style.colorImg
        ? { "style.colorImg": style.colorImg }
        : style.color && style.colorImg
        ? { "style.color": style.color, "style.colorImg": style.colorImg }
        : rating === "all"
        ? {}
        : {};

    const recommendedSortOptions =
      order === "Recommended" ? { rating: -1 } : {};

    const sortOptions =
      order === "Newest to Oldest"
        ? { updatedAt: -1 }
        : order === "Oldest to Newest"
        ? { updatedAt: 1 }
        : order === "All"
        ? {}
        : {};

    const reviewsAfterFilter = await Review.find({
      product: product._id,
      ...ratingOptions,
      ...sizeOptions,
      ...styleOptions,
    })
      .sort({ ...recommendedSortOptions, ...sortOptions })
      .populate("reviewBy");

    res.status(200).json(reviewsAfterFilter);
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

handler.use(auth).put(async (req, res) => {
  try {
    await db.connectDb();

    const { id } = req.query;

    const reviews = await Review.find({ product: id });
    const product = await Product.findById(id);

    // Kiểm tra liệu trước đây user đã review sản phẩm hiện tại hay chưa
    // req.user là _id của user, ta đã gán khi sử dung middleware auth
    const exist = reviews.find((x) => x.reviewBy.toString() == req.user);

    // Nếu đã review trước đây rồi
    // Thực hiện update lại review đó dựa theo _id của product và id của review
    if (exist) {
      await Review.updateOne(
        { _id: exist._id },
        {
          //Update lại nội dung review
          $set: {
            product: id,
            review: req.body.review,
            size: req.body.size,
            fit: req.body.fit,
            style: req.body.style,
            feature: req.body.feature,
            quality: req.body.quality,
            rating: Number(req.body.rating),
            images: req.body.images,
          },
        },
        { new: true }
      );

      //Update lại số lượng reviews và điểm trung bình rating của sản phẩm
      product.numReviews = reviews.length;
      product.rating =
        reviews.reduce((a, r) => r.rating + a, 0) / reviews.length;

      await product.save();
      //Điền thông tin trường reviewBy trước khi trả data về Frontend
      // await updatedProduct.populate("reviews.reviewBy");

      await db.disConnectDb();

      return res.status(200).json({
        reviews: await Review.find({ product: id })
          .populate({
            path: "reviewBy",
            model: User,
          })
          .sort({ updatedAt: -1 }),
      });
      //Khi trước đây chưa review về product, tiến hành tạo mới review
    }
    //Nếu user chưa từng review về sản phẩm thì tạo mới Review
    else {
      const review = {
        product: id,
        reviewBy: req.user,
        rating: Number(req.body.rating),
        review: req.body.review,
        size: req.body.size,
        fit: req.body.fit,
        style: req.body.style,
        images: req.body.images,
        feature: req.body.feature,
        quality: req.body.feature,
      };

      const newReviewsLength = reviews.length + 1;

      product.numReviews = newReviewsLength;

      product.rating =
        reviews.reduce((a, c) => {
          return a + c.rating;
        }, Number(req.body.rating)) / newReviewsLength;

      await Review.create(review);

      await product.save();

      await db.disConnectDb();
      return res.status(200).json({
        reviews: await Review.find({ product: id })
          .populate({
            path: "reviewBy",
            model: User,
          })
          .sort({ updatedAt: -1 }),
      });
    }
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
