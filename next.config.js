module.exports = {
  async redirects() {
    return [
      {
        source: "/cms",
        destination: "https://media.dinvinguide.se/wp-admin",
        permanent: true,
      },
      {
        source: "/dryckeslistan/recept/:path*",
        destination: "/recept/:path*",
        permanent: true,
      },
      {
        source: "/dryckeslistan/drycker/:path*",
        destination: "/drycker/:path*",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fredrikschelin/glogg-bast-i-test-2",
        destination: "/anders/glogg-bast-i-test",
        permanent: true,
      },
      {
        source: "/bestchampagne",
        destination: "https://bestchampagne.se",
        permanent: true,
      },
      {
        source: "/dryckeslistan/topplistor/:path*",
        destination: "/topplistor/:path*",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/lasarfraga-vilket-vin-ska-jag-matcha-till-den-fetare-sasen-bearnaise",
        destination: "/fredrikschelin/bearnaisesas-och-vin",
        permanent: true,
      },

      {
        source: "/fredrikschelin/champagne-bast-i-test-2018",
        destination: "/fredrikschelin/champagne-bast-i-test-2018-2",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-9/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-8/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-7/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-6/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-5/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-4/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-3/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-12/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-11/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source: "/alla-recept",
        destination: "/recept",
        permanent: true,
      },
      {
        source: "/alla-drycker",
        destination: "/dryckesutforskaren",
        permanent: true,
      },
      {
        source: "/alla-druvor",
        destination: "/dryckeslistan",
        permanent: true,
      },
      {
        source: "/all",
        destination: "/recept",
        permanent: true,
      },
      {
        source: "/all/:path*",
        destination: "/sok",
        permanent: true,
      },
      {
        source: "/undefined",
        destination: "/",
        permanent: true,
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: [process.env.CMS_BASE_URL, "i.ytimg.com", "img.youtube.com"],
    formats: ["image/avif", "image/webp"],
  },
  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat",
  //     });
  //   }

  //   return config;
  // },
};
