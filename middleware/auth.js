import { getToken } from "next-auth/jwt";

const auth = async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (token) {
    //Nếu đã sign in, gán value cho property user của req bằng với id của user
    req.user = token.sub;

    //Cho phép thực hiện tác vụ tiếp theo
    next();
  } else {
    res.status(401).json({ message: "Not signed in" });
  }
};

export default auth;
