/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "cdn.example.com"],
  },
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
};

module.exports = nextConfig;
