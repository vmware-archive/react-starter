require('../spec_helper');

describe('TodoAdder', () => {
  let addTodoItemSpy;

  beforeEach(() => {
    addTodoItemSpy = jasmine.createSpy('addTodoItem');
    const TodoAdder = require('../../../app/components/todo_adder');
    ReactDOM.render(<TodoAdder addTodoItem={addTodoItemSpy}/>, root);
  });

  describe('when adding a todo item', () => {
    beforeEach(() => {
      $('.todo-adder input').val('do this thing').simulate('change');
      $('.todo-adder form').simulate('submit');
    });

    it('calls the addTodoItem method', () => {
      expect(addTodoItemSpy).toHaveBeenCalledWith('do this thing');
    });

    it('clears out the input text', () => {
      expect('.todo-adder input').toHaveValue('');
    });
  });
});
