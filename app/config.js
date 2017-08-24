const config = require('../pui-react-tools/config')();

const {globalNamespace = 'Application'} = config;

module.exports = (function() {
  `window.${globalNamespace} = {config: ${config}}`;
})();
