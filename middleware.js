import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //pathname: path của trang đích
  //origin: path của trang xuất phát
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  //Tự động chuyển hướng về lại trang xuất phát khi truy cập URL /checkout nếu chưa đăng nhập
  if (pathname == "/checkout") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }

  //Tự động chuyển hướng về lại trang xuất phát khi truy cập URL bắt đầu bằng order nếu chưa đăng nhập
  if (pathname.startsWith("/order")) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }

  //Tự động chuyển hướng về lại trang xuất phát khi truy cập URL /profile nếu chưa đăng nhập
  if (pathname.startsWith("/profile")) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }

  //Tự động chuyển hướng về lại trang xuất phát khi truy cập URL /admin nếu chưa đăng nhập
  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(`${origin}`);
    if (session.role !== "admin") return NextResponse.redirect(`${origin}`);
  }
}
