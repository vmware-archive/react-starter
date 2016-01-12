const join = require('url-join');
const path = require('path');

function assetPath(asset, options = {}) {
  const defaultManifestPath = path.join(process.cwd(), 'public', 'rev-manifest.json');
  const {assetHost, assetPort, manifestPath = defaultManifestPath} = options;
  if (assetHost) return `//${join(...[[assetHost, assetPort].filter(Boolean).join(':'), asset])}`;
  let revManifest;
  try {
    revManifest = require(manifestPath);
  } catch(e) {
    revManifest = {};
  }
  return `/${revManifest[asset] || asset}`;
}

module.exports = {assetPath};
