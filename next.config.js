/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dinvinguide.se",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;
