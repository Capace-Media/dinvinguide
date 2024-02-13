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
      {
        source: "/anetterosvall",
        destination: "/skribenter/anetterosvall", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/anetterosvall/:slug",
        destination: "/skribenter/anetterosvall/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/annaantonia",
        destination: "/skribenter/annaantonia", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/annaantonia/:slug",
        destination: "/skribenter/annaantonia/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/eva",
        destination: "/skribenter/eva", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/eva/:slug",
        destination: "/skribenter/eva/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/happyfoodbypetra",
        destination: "/skribenter/happyfoodbypetra", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/happyfoodbypetra/:slug",
        destination: "/skribenter/happyfoodbypetra/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/harnsupsestormoilaychricalituriumaterverefertingue",
        destination:
          "/skribenter/harnsupsestormoilaychricalituriumaterverefertingue", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/harnsupsestormoilaychricalituriumaterverefertingue/:slug",
        destination:
          "/skribenter/harnsupsestormoilaychricalituriumaterverefertingue/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/jerry",
        destination: "/skribenter/jerry", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/jerry/:slug",
        destination: "/skribenter/jerry/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/maja",
        destination: "/skribenter/maja", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/maja/:slug",
        destination: "/skribenter/maja/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/nordefors",
        destination: "/skribenter/nordefors", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/nordefors/:slug",
        destination: "/skribenter/nordefors/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/raphael",
        destination: "/skribenter/raphael", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/raphael/:slug",
        destination: "/skribenter/raphael/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/tobias-pryssander",
        destination: "/skribenter/tobias-pryssander", // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: "/tobias-pryssander/:slug",
        destination: "/skribenter/tobias-pryssander/:slug", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
