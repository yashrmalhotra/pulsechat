import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode:false,
  async rewrites(){
    console.log("next rewrite",process.env.NEXT_PUBLIC_SERVER_URL)
    return [
      {
        source:"/api/:path*",
        destination:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*`
      }
    ]
  }
};

export default nextConfig;