import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';
import LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import autoprefixer from 'autoprefixer';

export default function() {
  return {
    cache: true,
    devtool: 'source-map',
    entry: {spec: './spec/app/index.js'},
    module: {
      rules: [
        {
          test: [/\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/],
          exclude: /node_modules/,
          use: {loader: 'file-loader?name=[name].[ext]'}
        },
        {
          test: /\.?scss$/,
          use: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})
        },
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {filename: '[name].js', chunkFilename: '[id].js'},
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin({filename: '[name].css'}),
      new LoaderOptionsPlugin({options: {
        postcss: () => [autoprefixer],
      }})
    ],
    watch: true
  };
};