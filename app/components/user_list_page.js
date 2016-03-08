const React = require('react');
const types = React.PropTypes;

class UserListPage extends React.Component {
  static propTypes = {
    users: types.array
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
