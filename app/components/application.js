require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const TodoAdder = require('./todo_adder');
const TodoList = require('./todo_list');
const types = React.PropTypes;
const {useStore} = require('p-flux');

class Application extends React.Component {
  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired
  };

  render() {
    const {config: {title}, store: {todoItems}} = this.props;
    return (
      <div className="pui-react-starter">
        <header className="title">{title}</header>
        <header>Things to do</header>
        <TodoAdder/>
        <TodoList todoItems={todoItems}/>
      </div>
    );
  }
}

const ApplicationWithStore = useStore(Application,
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [require('../dispatchers/todo_dispatcher')],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(ApplicationWithStore);

module.exports = ApplicationWithStore;
