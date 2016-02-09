require('../spec_helper');

describe('Application', () => {
  let TodoList;

  beforeEach(() => {
    const Application = require('../../../app/components/application');
    TodoList = require('../../../app/components/todo_list');
    spyOn(TodoList.prototype, 'render').and.callThrough();
    ReactDOM.render(<Application Dispatcher={Dispatcher}/>, root);
  });

  it('has a TodoAdder', () => {
    expect('.todo-adder').toExist();
  });

  it('has a TodoList', () => {
    expect('.todo-list').toExist();
  });
});
