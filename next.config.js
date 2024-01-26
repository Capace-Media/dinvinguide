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
  async redirects() {
    return [
      {
        source: "/skolor",
        destination: "/guide/vinskolan",
        permanent: true,
      },

      {
        source: "/skolor/:slug",
        destination: "/guide/vinskolan/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
