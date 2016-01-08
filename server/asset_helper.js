const join = require('url-join');
const {compact} = require('../helpers/application_helper');

function assetPath(asset, config = {}) {
  const {assetHost, assetPort} = config;
  if (assetHost) {
    return `//${join(...[compact([assetHost, assetPort]).join(':'), asset])}`;
  }
  let revManifest;
  try {
    revManifest = require('../public/rev-manifest.json');
  } catch(e) {
    revManifest = {};
  }
  return `/${revManifest[asset] || asset}`;
}

module.exports = {assetPath};
