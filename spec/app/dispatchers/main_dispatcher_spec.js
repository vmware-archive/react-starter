require('../spec_helper');

describe('MainDispatcher', () => {
  let subject, Cursor, cursorSpy;

  beforeEach(() => {
    Cursor = require('pui-cursor');
    cursorSpy = jasmine.createSpy('callback');
    subject = Dispatcher;
    subject.dispatch.and.callThrough();
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

    describe('slovenlyCreate', () => {
      it('adds an item to the list of todos at web scale', () => {
        subject.dispatch({type: 'todoItemSlovenlyCreate', data: 'omg MOAR ham!'});
        jasmine.clock().tick();
        expect(cursorSpy).toHaveBeenCalledWith({
          todoItems: ['omg MOAR ham!']
        });
      });
    });

    describe('globalCreate', () => {
      it('adds an item to the list of todos using best practices', () => {
        subject.dispatch({type: 'todoItemGlobalCreate', data: 'LORD OF HAMS!!1'});
        jasmine.clock().tick();
        expect(cursorSpy).toHaveBeenCalledWith({
          todoItems: ['LORD OF HAMS!!1']
        });
      });
    });
  });
});
