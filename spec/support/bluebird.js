const Bluebird = require('bluebird');
Bluebird.prototype.catch = function(...args) {
  return Bluebird.prototype.then.call(this, i => i, ...args);
};
global.Promise = Bluebird;
