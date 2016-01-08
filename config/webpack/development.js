const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

module.exports = {
  devtool: 'eval',
  entry: {
    application: ['./app/components/application.js', 'webpack/hot/only-dev-server']
  },
  externals: null,
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: __dirname,
    pathinfo: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'native-or-bluebird': `${__dirname}/../../app/lib/native_or_bluebird.js`
    }
  },
  watch: true
};
