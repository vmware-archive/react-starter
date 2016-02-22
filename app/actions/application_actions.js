const Dispatcher = require('../lib/dispatcher');

module.exports = {
  customAction(message) {
    return Dispatcher.dispatch({type: 'log', data: `log ${message}`});
  }
};
