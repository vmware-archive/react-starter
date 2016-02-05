require('babel-polyfill');
const TodoAdder = require('./todo_adder');
const TodoList = require('./todo_list');
const Bootstrap = require('../bootstrap');
const React = require('react');

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {todoItems: []};
  }

  addTodoItem = todo => {
    this.setState({todoItems: this.state.todoItems.concat(todo)});
  };

  render() {
    const {todoItems} = this.state;

    return (
      <div className="pui-react-starter">
        <TodoAdder addTodoItem={this.addTodoItem} />
        <TodoList todoItems={todoItems}/>
      </div>
    );
  }
}

Bootstrap.init(Application);

module.exports = Application;
