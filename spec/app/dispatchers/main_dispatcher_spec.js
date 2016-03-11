require('../spec_helper');

describe('MainDispatcher', () => {
  let subject, Cursor, cursorSpy;

  beforeEach(() => {
    Cursor = require('pui-cursor');
    cursorSpy = jasmine.createSpy('callback');
    subject = Dispatcher;

    //dispatch is spied on in spec_helper
    subject.dispatch.and.callThrough();

    //prevent console logs
    spyOn(subject, 'onDispatch');
  });

  describe('todoItem', () => {
    beforeEach(() => {
      subject.$store = new Cursor({todoItems: []}, cursorSpy);
    });

    describe('create', () => {
      it('adds an item to the list of todos', () => {
        subject.dispatch({type: 'todoItemCreate', data: 'buy ham'});
        expect(cursorSpy).toHaveBeenCalledWith({
          todoItems: ['buy ham']
        });
      });
    });
  });

  describe('userCreate', () => {
    beforeEach(() => {
      subject.$store = new Cursor({users: [{name: 'Alice'}]}, cursorSpy);
    });

    it('adds a user to the list of users', () => {
      subject.dispatch({type: 'userCreate', data: {name: 'Bob'}});
      expect(cursorSpy).toHaveBeenCalledWith({
        users: [
          {name: 'Alice'},
          {name: 'Bob'}
        ]
      });
    });
  });
});
