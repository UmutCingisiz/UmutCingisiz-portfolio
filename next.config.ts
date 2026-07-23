import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* Projedeki diğer özel ayarlar (örneğin mdx veya deneysel özellikler) varsa burada kalabilir */

  // Dev'de 127.0.0.1 üzerinden gelen isteklerde (ör. Playwright baseURL) HMR/dev
  // kaynaklarının cross-origin diye bloklanmasını önler.
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.umutcingisiz.com" }],
        destination: "https://umutcingisiz.com/:path*",
        permanent: true,
      },
    ];
  },

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

export default withSentryConfig(nextConfig, {
  org: "umutcingisiz",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  // Readable stack traces when SENTRY_AUTH_TOKEN is set on Vercel/CI
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  // Avoid ad-blockers blocking browser error reports
  tunnelRoute: "/monitoring",
});
