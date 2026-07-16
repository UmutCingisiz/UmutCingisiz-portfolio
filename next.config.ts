import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Projedeki diğer özel ayarlar (örneğin mdx veya deneysel özellikler) varsa burada kalabilir */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;