const React = require('react');
const types = require('react').PropTypes;
const TodoAdder = require('./todo_adder');
const TodoList = require('./todo_list');

class TodoPage extends React.Component {
  static propTypes = {
    config: types.object,
    todoItems: types.array
  };

  render() {
    const {config: {title}, todoItems} = this.props;
    return (
      <div className="todo-page">
        <h3 className="title">{title}</h3>
        <h3>Things to do</h3>
        <TodoAdder/>
        <TodoList todoItems={todoItems}/>
      </div>
    );
  }
}

module.exports = TodoPage;
