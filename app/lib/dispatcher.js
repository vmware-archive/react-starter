const noop = () => {};

const Dispatcher = {
  dispatch(event) {
    this.onDispatch(event);
    const count = this.dispatchers.filter((dispatcher) => {
      if(!dispatcher[event.type]) return false;
      this::dispatcher[event.type](event);
      return true;
    }).length;
    if(!count) {
      /* eslint-disable no-console */
      console.warn('dispatching unhandled event', event);
      /* eslint-enable no-console */
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
