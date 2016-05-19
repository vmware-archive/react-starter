require('../spec_helper');

describe('TodoAdder', () => {
  beforeEach(() => {
    const TodoAdder = require('../../../app/components/todo_adder');
    ReactDOM.render(<TodoAdder/>, root);
  });

  describe('when adding a todo item', () => {
    beforeEach(() => {
      $('.todo-adder input').val('do this thing').simulate('change');
      $('.todo-adder form').simulate('submit');
    });

    it('adds the todoItem', () => {
      expect('todoItemCreate').toHaveBeenDispatchedWith({data: 'do this thing'});
    });

    it('clears out the input text', () => {
      expect('.todo-adder input').toHaveValue('');
    });
  });
});
