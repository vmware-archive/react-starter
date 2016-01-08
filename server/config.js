const fs = require('fs');

const config = ['application', process.env.NODE_ENV || 'development', 'local']
  .map(filename => `${__dirname}/../config/${filename}.json`)
  .filter(fs.existsSync)
  .map(filename => require(filename))
  .reduce((memo, json) => ({...memo, ...json}), {});

module.exports = config;
