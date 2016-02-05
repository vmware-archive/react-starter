const React = require('react');
const TodoItem = require('./todo_item');
const types = React.PropTypes;

class TodoList extends React.Component {
  static propTypes = {
    todoItems: types.array.isRequired
  };

  render() {
    const {todoItems} = this.props;
    const todoItemsList = todoItems.map((item, key) => (<TodoItem value={item} key={key}/>));

    return (
      <ul className="todo-list">
        {todoItemsList}
      </ul>
    );
  }
}

module.exports = TodoList;
