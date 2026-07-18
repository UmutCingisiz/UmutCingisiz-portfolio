import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Projedeki diğer özel ayarlar (örneğin mdx veya deneysel özellikler) varsa burada kalabilir */

  // Dev'de 127.0.0.1 üzerinden gelen isteklerde (ör. Playwright baseURL) HMR/dev
  // kaynaklarının cross-origin diye bloklanmasını önler.
  allowedDevOrigins: ["127.0.0.1", "localhost"],

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