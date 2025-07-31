const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    _next_intl_trailing_slash: "never",
    _next_intl_locale_prefix: "always",
    _next_intl_default_locale: "en",
  },
  trailingSlash: false,
  experimental: {
    // typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      url: false,
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
