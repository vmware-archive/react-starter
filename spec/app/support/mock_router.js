const Url = require('url');
const Qs = require('qs');

let routes = {};

let OldRouter;
let RouterContainer;

const MockRouter = function() {
  return MockRouter;
};

function getParamsFromRoute(route, routeName) {
  const valueRegex = new RegExp('^' + routeName.replace(/\/:[^\/]*/g, '/([^\/]*)') + '$');
  const keys = (routeName.match(/:([^\/]*)/g) || []).map(key => key.replace(':', ''));
  let matches = route.match(valueRegex) || [];
  return {keys, matches};
}

function zip(keys, values) {
  return keys.reduce((memo, key, i) => {
    memo[key] = values[i];
    return memo;
  }, {});
}

Object.assign(MockRouter, {
  install(_RouterContainer) {
    RouterContainer = _RouterContainer;
    OldRouter = RouterContainer.Router;
    RouterContainer.Router = MockRouter;
  },

  uninstall() {
    RouterContainer.Router = OldRouter;
  },

  get(route, callback) {
    routes[route] = callback;
  },

  navigate: jasmine.createSpy('navigate').and.callFake(function(route) {
    const url = Url.parse(route);
    const queryParams = url.query ? Qs.parse(url.query) : {};
    const newRoute = Url.format({...url, query: null, search: null});

    const routedWithId = Object.keys(routes).find(function(routeName){
      let {keys, matches} = getParamsFromRoute(newRoute, routeName);
      if (matches.length > 1) {
        matches = matches.slice(1);
        const req = {params: {...queryParams, ...zip(keys, matches)}};
        routes[routeName](req);
        return true;
      }
    });
    if(!routedWithId) routes[newRoute]({params: {...queryParams}});
  })
});

module.exports = MockRouter;
