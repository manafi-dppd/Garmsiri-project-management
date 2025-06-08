import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // جلوگیری از بهینه‌سازی نادرست Prisma Client
    config.externals = [...(config.externals || []), "@prisma/client"];

    // حل مشکل alias برای محیط کلاینت (اختیاری)
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...config.resolve.alias,
        ".prisma/client": require.resolve("@prisma/client"),
      };
    }

    return config;
  },
};

export default nextConfig;
