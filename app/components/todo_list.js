const React = require('react');
const TodoItem = require('./todo_item');
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  static propTypes = {
    todoItems: PropTypes.array.isRequired
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
