module.exports = {
  target: 'serverless',
  experimental: {
    ampBindInitData: true
  },
  env: {
    DEV: process.env.NODE_ENV !== 'production'
  },
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeTitle: false, removeDesc: false, cleanupIDs: false }
              ]
            }
          }
        }
      ]
    });
    return config;
  }
};
