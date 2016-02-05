require('../spec_helper');

describe('Application', () => {
  let TodoList, subject;

  beforeEach(() => {
    const Application = require('../../../app/components/application');
    TodoList = require('../../../app/components/todo_list');
    spyOn(TodoList.prototype, 'render').and.callThrough();
    subject = ReactDOM.render(<Application/>, root);
  });

  it('has a TodoAdder', () => {
    expect('.todo-adder').toExist();
  });

  it('has a TodoList', () => {
    expect('.todo-list').toExist();
  });

  it('keeps track of todo items and passes them to the todo list', () => {
    expect(TodoList).toHaveBeenRenderedWithProps({todoItems: []});
    subject.addTodoItem('STUFF WE GOTTA DO');
    expect(TodoList).toHaveBeenRenderedWithProps({todoItems: ['STUFF WE GOTTA DO']});
  });
});
