import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';

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
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})
        },
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {filename: '[name].js', chunkFilename: '[id].js'},
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin({filename: '[name].css'}),
    ],
    watch: true
  };
};