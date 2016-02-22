const warn = require('fbjs/lib/warning');

const noop = () => {};

const Dispatcher = {
  dispatch(event) {
    this.onDispatch(event);
    const dispatched = this.dispatchers.some((dispatcher) => {
      if(!dispatcher[event.type]) return false;
      this::dispatcher[event.type](event);
      return true;
    });
    if(!dispatched) {
      warn(false, 'dispatching unhandled event %s', JSON.stringify(event));
    }
  },

  initialize({dispatchers = [], onDispatch = noop}) {
    Object.assign(this, {
      dispatchers,
      onDispatch
    });
  },

  reset() {
    const dispatchKeys = Object.keys(Dispatcher);
    Object.keys(SingletonDispatcher).forEach(key => {
      if(!dispatchKeys.includes(key)) {
        delete SingletonDispatcher[key];
      } else {
        SingletonDispatcher[key] = Dispatcher[key];
      }
    });
  }
};

const SingletonDispatcher = {...Dispatcher};

module.exports = SingletonDispatcher;
