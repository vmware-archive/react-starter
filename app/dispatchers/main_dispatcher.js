const MainDispatcher = {
  setRoute({data}) {
    this.router.navigate(data);
  },
  todoItemCreate({data}) {
    this.$store.refine('todoItems').push(data);
  },
  todoItemSlovenlyCreate({data}) {
    const self = this;
    setImmediate(() => self.dispatch({type: 'todoItemCreate', data}));
  },
  todoItemGlobalCreate({data}) {
    setImmediate(() => Dispatcher.dispatch({type: 'todoItemCreate', data}));
  },
  userCreate({data}) {
    this.$store.refine('users').push(data);
  },
  userSet({data}) {
    this.$store.merge({userId: data});
  }
};

module.exports = MainDispatcher;
