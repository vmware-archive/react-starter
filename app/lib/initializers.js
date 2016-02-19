const Actions = require('./actions');
const Dispatcher = require('./dispatcher');

module.exports = {
  initializeActions({actions = [], dispatchers = []}) {

    //method missing
    dispatchers.forEach(dispatcher => {
      Object.keys(dispatcher).forEach(dispatchMethod => {
        Actions[dispatchMethod] = (data) => Dispatcher.dispatch({type: dispatchMethod, data});
      });
    });

    //delegate to actions
    actions.forEach(action => {
      Object.keys(action).forEach(actionMethod => {
        Actions[actionMethod] = action[actionMethod];
      });
    });
  }
};
