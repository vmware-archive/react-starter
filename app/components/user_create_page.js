const {Actions} = require('p-flux');
const React = require('react');

class UserCreatePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {userName: ''};
  }

  submit = e => {
    e.preventDefault();
    Actions.userCreate({name: this.state.userName});
    this.setState({userName: ''});
    Actions.setRoute('/users/list');
  };

  change = e => {
    this.setState({[e.currentTarget.name]: e.target.value});
  };

  render() {
    const {userName} = this.state;
    return (
      <div className="user-create-page">
        <h3>Create a User!</h3>
        <form onSubmit={this.submit}>
          <input type="text" name="userName" value={userName} onChange={this.change}/>
          <button type="submit">Create User</button>
        </form>
      </div>
    );
  }
}

module.exports = UserCreatePage;
