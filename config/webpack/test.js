const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

module.exports = {
  devtool: 'eval',
  entry: null,
  externals: null,
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel?sourceMaps=true'}
    ]
  },
  output: {
    filename: 'spec.js'
  },
  plugins: [
    new NoErrorsPlugin()
  ],
  quiet: true,
  resolve: {
    alias: {
      'native-or-bluebird': `${__dirname}/../../app/lib/native_or_bluebird.js`
    }
  },
  watch: true
};
