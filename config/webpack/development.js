import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin';
import LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import autoprefixer from 'autoprefixer';

export default function() {
  return {
    cache: true,
    devtool: 'source-map',
    entry: {
      application: ['react-hot-loader/patch', './app/index.js', 'webpack-hot-middleware/client?path=__webpack_hmr']
    },
    module: {
      rules: [
        {
          test: [/\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/],
          exclude: /node_modules/,
          use: {loader: 'file-loader?name=[name].[ext]'}
        },
        {
          test: /\.?scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {filename: '[name].js', chunkFilename: '[id].js', pathinfo: true},
    plugins: [
      new NoEmitOnErrorsPlugin(),
      // new HtmlWebpackPlugin({title: 'ReactStarter', template: 'app/index.js'}),
      new ExtractTextPlugin({filename: '[name].css'}),
      new ManifestPlugin(),
      new HotModuleReplacementPlugin(),
      new LoaderOptionsPlugin({options: {
        postcss: () => [autoprefixer],
      }}),
    ]
  }
};