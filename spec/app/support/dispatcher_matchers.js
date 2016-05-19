function objectDiffs(actual, expected, util, customEqualityTesters) {
  function getDiffEntries() {
    return Object.entries(expected).filter(([key, value]) => {
      return !util.equals(actual[key], value, customEqualityTesters);
    });
  }

  function formatDiff([key, value]) {
    return `key: ${key}, \nexpected: ${jasmine.pp(value)}, \nfound   : ${jasmine.pp(actual[key])}`;
  }

  return getDiffEntries().map(formatDiff).join(',\n');
}

function getMessage(pass, actual, expected, observed, verb, util, customEqualityTesters) {
  const passStrings = [
    `Expected ${actual} not to have been ${verb} with`,
    `${jasmine.pp(expected)}, but it was`
  ];

  const failStrings = [
    `Expected ${actual} to have been ${verb} with`,
    `${jasmine.pp(expected)}`,
    ...diffMessage()
  ];

  function diffMessage() {
    if (!observed.length) return [`but it was never ${verb}`];

    return [
      `${actual} was ${verb} with ${jasmine.pp(observed)}`,
      'diff:',
      objectDiffs(observed[0], expected, util, customEqualityTesters)
    ];
  }

  return (pass ? passStrings : failStrings).join(',\n');
}

beforeEach(() => {
  jasmine.addMatchers({
    toHaveBeenDispatched(){
      return {
        compare(actual){
          const pass = Dispatcher.dispatch.calls.all().find((dispatchCall) => {
            return dispatchCall.args[0].type === actual;
          });

          const allDispatchers = Dispatcher.dispatch.calls.all().map((dispatchCall) => {
            return dispatchCall.args[0].type;
          });

          let message;
          if (pass) {
            message = `Expected ${actual} not to have been dispatched, but it was`;
          } else {
            message = `Expected ${actual} to have been dispatched, but it was not. \n Actual dispatch calls are ${allDispatchers.join(', ')}`;
          }

          return {pass, message};
        }
      };
    },

    toHaveBeenDispatchedWith(util, customEqualityTesters){
      return {
        compare(actual, expected){
          const observed = Dispatcher.dispatch.calls.all()
            .map(dispatchCall => dispatchCall.args[0])
            .filter(({type}) => type === actual);

          const pass = observed.some(params => {
            return util.equals(params, jasmine.objectContaining(expected), customEqualityTesters);
          });

          return {
            pass,
            message: getMessage(pass, actual, expected, observed, 'dispatched', util, customEqualityTesters)
          };
        }
      };
    }
  });
});