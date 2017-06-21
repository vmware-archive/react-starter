const camelCase = require('lodash.camelcase');
const path = require('path');

function getEnv() {
  let env = {};

  try {
    env = require(path.join(process.cwd(), 'config', 'env.json')).reduce((memo, key) => {
      if (key in process.env) {
        const keyCamelCase = camelCase(key);
        let value = process.env[key];

        if(String(value) === 'false') value = false;
        if(String(value) === 'true') value = true;

        memo[keyCamelCase] = value;
      }
      return memo;
    }, {});
  } catch(e) {

  }

  return env;
}

function exists(filename) {
  try {
    require(filename);
    return true;
  } catch(e) {
    if (!e.message.includes('Cannot find module')) {
      throw e;
    }
    return false;
  }
}

function requireEnvFile(...files) {
  const currentDirectory = process.cwd();
  return files
    .map(filename => path.join(currentDirectory, 'config', `${filename}.json`))
    .filter(exists)
    .map(filename => require(filename));
}

module.exports = function() {
  const config = [...requireEnvFile('application', process.env.NODE_ENV || 'development'), getEnv(), ...requireEnvFile('local')]
    .reduce((memo, json) => ({...memo, ...json}), {});
  return config;
};