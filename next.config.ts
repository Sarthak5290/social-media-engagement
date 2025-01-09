import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"], // Add this line to allow images from Unsplash
  },
};

export default nextConfig;
