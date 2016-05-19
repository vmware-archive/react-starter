let isomorphicFetch;
const nativeFetch = global.fetch;

module.exports = {
  install() {
    if (!isomorphicFetch) {
      global.fetch = null;
      isomorphicFetch = require('isomorphic-fetch');
    }
    global.fetch = isomorphicFetch;
  },

  uninstall() {
    global.fetch = nativeFetch;
  }
};