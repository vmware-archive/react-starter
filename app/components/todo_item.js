const React = require('react');
import PropTypes from 'prop-types';

class TodoItem extends React.Component{
  static propTypes = {
    value: PropTypes.node.isRequired
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
