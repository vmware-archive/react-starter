module.exports = {
  webpack: {
    devtool: 'cheap-module-source-map',
    entry: {
      application: ['./app/components/application.js', 'webpack-hot-middleware/client']
    },
    integration: { devtool: 'source-map' }

  }
};