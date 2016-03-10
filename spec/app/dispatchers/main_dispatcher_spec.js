require('../spec_helper');

describe('MainDispatcher', () => {
  let Dispatcher, cursorSpy;

  beforeEach(() => {
    const onDispatch = jasmine.createSpy('onDispatch');
    const Cursor = require('pui-cursor');
    const MainDispatcher = require('../../../app/dispatchers/main_dispatcher');

    cursorSpy = jasmine.createSpy('callback');
    const store = require('../../../app/store');
    const $store = new Cursor(store, cursorSpy);

    Dispatcher = Object.assign({}, require('p-flux').Dispatcher, {$store});
    Dispatcher.initialize({dispatcherHandlers: [MainDispatcher], onDispatch});
    Dispatcher.dispatch.and.callThrough();
  });

  describe('#todoItemCreate', () => {
    it('adds an item to the list of todos', () => {
      Dispatcher.dispatch({type: 'todoItemCreate', data: 'buy ham'});
      expect(cursorSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        todoItems: ['buy ham']
      }));
    });
  });

  describe('#slovenlyItemCreate', () => {
    it('adds an item to the list of todos at web scale', () => {
      Dispatcher.dispatch({type: 'slovenlyItemCreate', data: 'omg MOAR ham!'});
      jasmine.clock().tick();
      expect(cursorSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        todoItems: ['omg MOAR ham!']
      }));
    });
  });

  describe('#globalItemCreate', () => {
    xit('adds an item to the list of todos using best practices', () => {
      Dispatcher.dispatch({type: 'globalItemCreate', data: 'LORD OF HAMS!!1'});
      jasmine.clock().tick();
      expect(cursorSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        todoItems: ['LORD OF HAMS!!1']
      }));
    });
  });
});
