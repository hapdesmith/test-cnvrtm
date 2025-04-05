import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.convertim.id',
        port: '',
        pathname: '/viewimage.php',
      },
    ],
  },
};

export default nextConfig;
