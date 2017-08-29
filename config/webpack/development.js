import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin';

export default function() {
  return {
    devServer: {
      hot: true,
      proxy: {
        '/config.js*': {
          target: `http://localhost:${process.env.API_PORT || 3001}`
        },
        '*': {
          bypass: () => '/index.html'
        }
      }
    },
    cache: true,
    devtool: 'source-map',
    entry: {
      application: [
        'babel-polyfill',
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${process.env.PORT || 3000}`,
        'webpack/hot/only-dev-server',
        './app/index.js'
      ],
    },
    module: {
      rules: [
        {
          test: [/\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/],
          exclude: /node_modules/,
          use: {loader: 'file-loader?name=[name].[ext]'}
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {filename: '[name].js', chunkFilename: '[id].js', pathinfo: true, publicPath: '/'},
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({title: 'ReactStarter', template: 'app/index.jsx'}),
      new HtmlWebpackIncludeAssetsPlugin({ assets: ['config.js'], append: false, hash: true}),
      new ManifestPlugin(),
      new HotModuleReplacementPlugin()
    ]
  };
};