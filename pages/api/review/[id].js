import auth from "@/middleware/auth";
import { Review } from "@/models/Review";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;

    const review = await Review.findById(id);

    const liked = review.likes.find(
      (user) => user.toString() === id.toString()
    );

    if (liked) {
      return res
        .status(400)
        .json({ message: "You haved liked this review already!" });
    }

    review.likes.push(req.user);

    await review.save();

    await db.disConnectDb();
    return res
      .status(200)
      .json(
        await Review.find({ product: review.product }).populate("reviewBy")
      );
  } catch (error) {
    await db.disConnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
