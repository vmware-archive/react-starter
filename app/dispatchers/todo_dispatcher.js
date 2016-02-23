const TodoDispatcher = {
  todoItemCreate({data}) {
    this.$store.refine('todoItems').push(data);
  }
};

module.exports = TodoDispatcher;
