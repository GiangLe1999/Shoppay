import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import db from "@/utils/db";

import clientPromise from "@/lib/mongodb";
import { User } from "@/models/User";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        await db.connectDb();

        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });

        if (user) {
          // Nếu user đã được tạo trước đó trong database, gọi hàm SignInUser với
          //đối số là object chứa password và user
          return SignInUser({ password, user });
        } else {
          // Nếu user không tồn tại trong database, return error
          throw new Error("This email does not exist");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      //Sub của Token là field chứa _id của user trong Database.
      let user = await User.findById(token.sub);
      //Bổ sung thêm thông tin cho user của session
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password");
  }

  // Dùng compare của bcrypt để so sánh 2 password
  const textPassword = await bcrypt.compare(password, user.password);

  // Nếu password không khớp
  if (!textPassword) {
    throw new Error("Email or password is wrong");
  }
  return user;
};
