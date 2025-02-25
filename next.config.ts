import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // Requests to /api/* will be forwarded
        destination: "https://menu-management.us-east-1.elasticbeanstalk.com/:path*", // Your backend URL
      },
    ];
  },
};

export default nextConfig;
