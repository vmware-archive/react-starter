const fs = require('fs');
const camelCase = require('lodash.camelcase');
const path = require('path');

const env = require(path.join(process.cwd(), 'config', 'env.json')).reduce((memo, key) => {
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

function requireEnvFile(...files) {
  return files
    .map(filename => path.join(process.cwd(), 'config', `${filename}.json`))
    .filter(fs.existsSync)
    .map(filename => require(filename));
}

const config = [...requireEnvFile('application', process.env.NODE_ENV || 'development'), env, ...requireEnvFile('local')]
  .reduce((memo, json) => ({...memo, ...json}), {});

module.exports = config;
