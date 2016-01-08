module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'native-or-bluebird': `${__dirname}/../../app/lib/native_or_bluebird.js`
    }
  }
};