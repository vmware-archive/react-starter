require('babel-core/register');
require('babel-polyfill');

/* eslint-disable no-var */
var app = require('./app');
/* eslint-enable no-var */
app.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

module.exports = app;
