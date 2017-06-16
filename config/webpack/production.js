import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import autoprefixer from 'autoprefixer';

export default function() {
  return {
    entry: {
      application: ['babel-polyfill', './app/index.js']
    },
    module: {
      rules: [
        {
          test: [/\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/],
          exclude: /node_modules/,
          use: {loader: 'file-loader?name=[name]-[hash].[ext]'}
        },
        {
          test: /\.scss$/,
          oneOf: [
            {test: /html-webpack-plugin/, use: 'null-loader'},
            {use: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})}
          ]
        },
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {filename: '[name]-[hash].js', chunkFilename: '[id].js', publicPath: '/'},
    plugins: [
      new DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
      new NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({title: 'ReactStarter', template: 'app/index.jsx'}),
      new HtmlWebpackIncludeAssetsPlugin({ assets: ['config.js'], append: false, hash: true}),
      new ManifestPlugin(),
      new ExtractTextPlugin({filename: '[name]-[hash].css'}),
      new UglifyJsPlugin({
        compressor: {screw_ie8: true, warnings: false},
        mangle: {screw_ie8: true},
        output: {comments: false, screw_ie8: true}
      }),
      new LoaderOptionsPlugin({options: {
        postcss: () => [autoprefixer],
      }}),
    ],
    stats: {colors: true, cached: false}
  };
};