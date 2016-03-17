const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env = null) {
  const {plugins = [], ...webpackConfig} = require(`./webpack/${env}`);
  const config = {
    bail: false,
    entry: {
      application: './app/components/application.js'
    },
    module: {
      loaders: [
        {test: [/\.svg$/, /\.png$/, /\.eot$/, /\.ttf$/, /\.woff$/], include: /node_modules/, loader: 'file?name=[name]-[hash].[ext]'},
        {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
      ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      pathinfo: true
    },
    plugins: [
      ...plugins,
      new ExtractTextPlugin("components.css", {
        allChunks: true
      })
    ]
  };
  return {...config, ...webpackConfig};
};
