const React = require('react');
const Actions = require('../actions/application_actions');

class TodoAdder extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {todoItem: ''};
  }

  submit = e => {
    e.preventDefault();
    Actions.todoItemCreate(this.state.todoItem);
    this.setState({todoItem: ''});
  };

  change = e => {
    this.setState({[e.currentTarget.name]: e.target.value});
  };

  render() {
    const {todoItem} = this.state;

    return (
      <div className="todo-adder">
        <form onSubmit={this.submit}>
          <input type="text" name="todoItem" value={todoItem} onChange={this.change}/>
          <button type="submit">Submit!</button>
        </form>
      </div>
    );
  }
};

module.exports = TodoAdder;
