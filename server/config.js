const fs = require('fs');
const camelCase = require('lodash.camelcase');

const env = require('../config/env.json').reduce((memo, key) => {
  if (key in process.env) {
    const keyCamelCase = camelCase(key);
    if (key.startsWith('USE_')) {
      memo[keyCamelCase] = String(process.env[key]) !== 'false';
    } else {
      memo[keyCamelCase] = process.env[key];
    }
  }
  return memo;
}, {});

const config = ['application', process.env.NODE_ENV || 'development', 'local']
  .map(filename => `${__dirname}/../config/${filename}.json`)
  .filter(fs.existsSync)
  .map(filename => require(filename))
  .concat(env)
  .reduce((memo, json) => ({...memo, ...json}), {});

module.exports = config;
