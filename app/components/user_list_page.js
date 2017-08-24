const React = require('react');
import PropTypes from 'prop-types';

class UserListPage extends React.Component {
  static propTypes = {
    users: PropTypes.array
  };

  render() {
    const {users} = this.props;
    const userItems = users.map((user, key) => <li key={key}>User name: {user.name}</li>);
    return (
      <div className="user-list-page">
        <h3>List of Users</h3>
        <ul className="user-list">{userItems}</ul>
      </div>
    );
  }
}

module.exports = UserListPage;
