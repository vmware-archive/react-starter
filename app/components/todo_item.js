const React = require('react');
const types = React.PropTypes;

class TodoItem extends React.Component{
  static propTypes = {
    value: types.node.isRequired
  };

  render() {
    const {value} = this.props;
    return (
      <li className="todo-item">
        {value}
      </li>
    );
  }
}

module.exports = TodoItem;
