/** @type {import('next').NextConfig} */

const path = require("node:path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
