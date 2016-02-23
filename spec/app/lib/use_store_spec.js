require('../spec_helper');

describe('#useStore', () => {
  let Dispatcher, Actions, onDispatchSpy, overrideMeSpy, ApplicationWithStore;
  beforeEach(() => {
    const useStore = require('../../../app/lib/use_store');
    const Application = ({store, foo}) => {
      return (
        <div className="application">
          <div className="foo">{foo}</div>
          <div className="letters">{store.letters.map((letter, i) => `${i}: ${letter}`).join(', ')}</div>
        </div>
      );
    };
    Actions = require('../../../app/lib/actions');
    Dispatcher = require('../../../app/lib/dispatcher');
    Dispatcher.dispatch.and.callThrough();

    onDispatchSpy = jasmine.createSpy('onDispatch');
    overrideMeSpy = jasmine.createSpy('overrideMe');

    const actions = [{
      pop() {
        Dispatcher.dispatch({type: 'remove', data: 0});
      },

      overrideMe: overrideMeSpy
    }];
    const dispatcherHandlers = [{
      push({data}) {
        this.$store.refine('letters').unshift(data);
        return `pushed ${data}`;
      },

      remove({data}) {
        this.$store.refine('letters').splice([data, 1]);
      },

      overrideMe() {
        throw new Error('I should not be called');
      }
    }];

    ApplicationWithStore = useStore(Application, {
      store: {letters: ['a', 'b']},
      actions,
      dispatcherHandlers,
      onDispatch: onDispatchSpy
    });
    ReactDOM.render(<ApplicationWithStore foo="bar"/>, root);
  });

  it('renders the component it is given', () => {
    expect('.foo').toHaveText('bar');
  });

  it('injects the store into the component', () => {
    expect('.letters').toHaveText('0: a, 1: b');
  });

  it('cleans up the dispatcher when unmounted', () => {
    expect(Dispatcher.$store).toBeDefined();
    ApplicationWithStore.reset();
    expect(Dispatcher.$store).not.toBeDefined();
  });

  it('cleans up actions when unmounted', () => {
    Actions.pop = '1234';
    ApplicationWithStore.reset();
    expect(Actions.pop).not.toBe('1234');
  });

  describe('Dispatcher', () => {
    it('delegates events to the dispatchers', () => {
      Dispatcher.dispatch({type: 'push', data: 'c'});
      expect('.letters').toHaveText('0: c, 1: a, 2: b');
    });

    it('calls "onDispatch" with the event', () => {
      Dispatcher.dispatch({type: 'push', data: 'c'});
      expect(onDispatchSpy).toHaveBeenCalledWith({type: 'push', data: 'c'});
    });
  });

  describe('Actions', () => {
    it('hooks up user-specified actions correctly', () => {
      Actions.pop();
      expect('.letters').toHaveText('0: b');
    });

    it('hooks up automatic actions correctly', () => {
      Actions.push('c');
      expect('.letters').toHaveText('0: c, 1: a, 2: b');
    });

    it('returns the result of the dispatch method', () => {
      expect(Actions.push('c')).toEqual('pushed c');
    });

    it('correctly overrides automatic actions with user-specified actions', () => {
      Actions.overrideMe();
      expect(overrideMeSpy).toHaveBeenCalled();
    });
  });
});
