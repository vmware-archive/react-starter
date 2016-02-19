const TodoDispatcher = {
  todoItemCreate({data}) {
    this.$store.refine('todoItems').push(data);
  },

  log({data}) {
    /* eslint-disable no-console */
    console.log(data);
    /* eslint-enable no-console */
  }
};

module.exports = TodoDispatcher;
