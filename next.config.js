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
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/vinguide/vinatlas",
        destination: "/vinatlas",
        permanent: true,
      },

      {
        source: "/vinguide/vinatlas/:slug",
        destination: "/vinatlas/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/vinguide/vinatlas/:slug*",
        destination: "/vinatlas/:slug*", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/skolor",
        destination: "/vinskolan", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/skolor/:slug",
        destination: "/vinskolan/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },

      {
        source: "/fredrikschelin",
        destination: "/skribenter/fredrikschelin", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/fredrikschelin/:slug",
        destination: "/skribenter/fredrikschelin/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/anders",
        destination: "/skribenter/anders", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/anders/:slug",
        destination: "/skribenter/anders/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/sofiaander",
        destination: "/skribenter/sofiaander", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/sofiaander/:slug",
        destination: "/skribenter/sofiaander/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/magnus",
        destination: "/skribenter/magnus", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/magnus/:slug",
        destination: "/skribenter/magnus/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/jesper",
        destination: "/skribenter/jesper", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/jesper/:slug",
        destination: "/skribenter/jesper/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
