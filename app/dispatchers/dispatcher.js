const Dispatcher = {
  dispatch(event) {
    const methodToDispatch = this[event.type];
    methodToDispatch.call(this, event);
  },

  todoItemCreate({data}) {
    this.$store.refine('todoItems').push(data);
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
