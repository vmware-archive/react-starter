module.exports = function(env = null) {
  const webpackConfig = require(`./webpack/${env}`);
  const config = {
    bail: false,
    entry: {
      application: './app/components/application.js'
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
      ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      pathinfo: true
    }
  };
  return {...config, ...webpackConfig};
};
