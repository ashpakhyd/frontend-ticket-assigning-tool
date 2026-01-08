import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 👇 THIS FIXES THE CRASH
  turbopack: {}
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
})(nextConfig);
