import type { NextConfig } from "next";
console.log("SERVER_URL:", process.env.NEXT_PUBLIC_SERVER_URL)
const nextConfig: NextConfig = {
  reactStrictMode:false,
  async rewrites(){
    return [
      {
        source:"/api/:path*",
        destination:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*`
      }
    ]
  }
};

export default nextConfig;