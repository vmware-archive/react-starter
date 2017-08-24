require('babel-core/register');
require('babel-polyfill');

/* eslint-disable no-var */
let app = require('./app')(require('pui-react-tools/assets/config')());
/* eslint-enable no-var */
let apiPort = process.env.API_PORT || process.env.PORT || 3001;
/* eslint-disable no-console */
console.log(`API listening on ${apiPort}`);
/* eslint-enable no-console */

app.listen(apiPort, function() {
  process.send && process.send({cmd: 'ready'});
});

module.exports = app;
