require('../spec_helper');

describe('TodoItem', () => {
  beforeEach(() => {
    const TodoItem = require('../../../app/components/todo_item');
    ReactDOM.render(<TodoItem value="hey" />, root);
  });

  it('renders the value of the todoitem', () => {
    expect('.todo-item').toHaveText('hey');
  });
});
