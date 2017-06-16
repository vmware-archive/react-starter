const config = require('../pui-react-tools/config')();

const {globalNamespace = 'Application'} = config;

module.exports = (function() {
  console.log(globalNamespace)
  console.log('config', config);
  `window.${globalNamespace} = {config: ${config}}`;
})();
