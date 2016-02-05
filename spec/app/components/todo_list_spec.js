require('../spec_helper');

describe('TodoList', () => {
  beforeEach(() => {
    const TodoList = require('../../../app/components/todo_list');
    ReactDOM.render(<TodoList todoItems={['do this', 'do that']} />, root);
  });

  it('renders the todolist', () => {
    expect('.todo-item').toHaveLength(2);
    expect('.todo-item:eq(0)').toHaveText('do this');
    expect('.todo-item:eq(1)').toHaveText('do that');
  });
});
