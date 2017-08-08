require('babel-core/register');
require('babel-polyfill');

/* eslint-disable no-var */
var app = require('./app')(require('../pui-react-tools/config')());
/* eslint-enable no-var */
app.listen(process.env.API_PORT || process.env.PORT || 3001, function() {
  process.send && process.send({cmd: 'ready'});
});

module.exports = app;
