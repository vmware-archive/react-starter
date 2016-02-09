const Dispatcher = require('../dispatchers/dispatcher');

const ApplicationActions = {
  todoItemCreate(data) {
    Dispatcher.dispatch({type: 'todoItemCreate', data});
  }
};

module.exports = ApplicationActions;
