const DefinePlugin = require('webpack/lib/DefinePlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new NoErrorsPlugin(),
    new UglifyJsPlugin({compress: {warnings: false}})
  ],
  resolve: {
    alias: {
      'native-or-bluebird': `${__dirname}/../../app/lib/native_or_bluebird.js`
    }
  }
};