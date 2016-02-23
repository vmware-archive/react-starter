const warn = require('fbjs/lib/warning');

const noop = () => {};

const Dispatcher = {
  dispatch(event) {
    let dispatchHandler;
    this.onDispatch(event);
    const dispatched = this.dispatcherHandlers.some((dispatcherHandler) => {
      if(!dispatcherHandler[event.type]) return false;
      dispatchHandler = this::dispatcherHandler[event.type];
      return true;
    });
    if(dispatched) return dispatchHandler(event);

    warn(false, 'dispatching unhandled event %s', JSON.stringify(event));
  },

  initialize({dispatcherHandlers = [], onDispatch = noop}) {
    Object.assign(this, {
      dispatcherHandlers,
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
