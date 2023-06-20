import { User } from "@/models/User";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

export default async function admin(req, res, next) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  await db.connectDb();
  let user = await User.findById(token.sub);
  await db.disConnectDb();

  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Access denied, Admin resources." });
  }
}
