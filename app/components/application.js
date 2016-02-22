require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const TodoAdder = require('./todo_adder');
const TodoList = require('./todo_list');
const types = React.PropTypes;
const useStore = require('../lib/use_store');

class Application extends React.Component {
  static propTypes = {
    store: types.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {todoItems} = this.props.store;
    return (
      <div className="pui-react-starter">
        <header>Things to do</header>
        <TodoAdder />
        <TodoList todoItems={todoItems}/>
      </div>
    );
  }
}

const ApplicationWithStore = useStore(Application,
  {
    store: require('../store'),
    actions: [require('../actions/application_actions')],
    dispatchers: [require('../dispatchers/todo_dispatcher')],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(ApplicationWithStore);

module.exports = ApplicationWithStore;
