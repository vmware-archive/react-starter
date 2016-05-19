const mockPromises = require('mock-promises');

const Deferred = function() {
  let resolver, rejector;
  const promise = new Promise(function(res, rej) {
    resolver = res;
    rejector = rej;
  });

  const wrapper = Object.assign(promise, {
    resolve(...args) {
      resolver(...args);
      mockPromises.executeForPromise(promise);
      return wrapper;
    },
    reject(...args) {
      rejector(...args);
      mockPromises.executeForPromise(promise);
      return wrapper;
    },
    promise() {
      return promise;
    }
  });
  return wrapper;
};

module.exports = Deferred;