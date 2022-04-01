module.exports = {
  async redirects() {
    return [
      {
        source: '/cms',
        destination: 'https://media.dinvinguide.se/wp-admin',
        permanent: true,
      },
      {
        source: '/dryckeslistan/recept/:path*',
        destination: '/recept/:path*',
        permanent: true,
      },
      {
        source: '/dryckeslistan/drycker/:path*',
        destination: '/drycker/:path*',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fredrikschelin/glogg-bast-i-test-2',
        destination: '/anders/glogg-bast-i-test',
        permanent: true,
      },
      {
        source: '/bestchampagne',
        destination: 'https://bestchampagne.se',
        permanent: true,
      },
      {
        source: '/dryckeslistan/topplistor/:path*',
        destination: '/topplistor/:path*',
        permanent: true,
      },
      {
        source:
          '/fredrikschelin/lasarfraga-vilket-vin-ska-jag-matcha-till-den-fetare-sasen-bearnaise',
        destination: '/fredrikschelin/bearnaisesas-och-vin',
        permanent: true,
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: [process.env.CMS_BASE_URL, 'i.ytimg.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
};
