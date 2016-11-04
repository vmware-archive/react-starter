require('../spec_helper');

describe('TodoPage', () => {
  beforeEach(() => {
    const TodoPage = require('../../../app/components/todo_page');
    ReactDOM.render(<TodoPage config={{title: 'the title'}} todoItems={['do this', 'do that']} />, root);
  });
  
  it('renders a title', () => {
    expect('.title').toHaveText('the title');
  });

  it('renders the todolist', () => {
    expect('.todo-item').toHaveLength(2);
    expect('.todo-item:eq(0)').toHaveText('do this');
    expect('.todo-item:eq(1)').toHaveText('do that');
  });
});
