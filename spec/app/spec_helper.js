require('babel-polyfill');
require('jasmine-ajax');
require('jasmine_dom_matchers');
require('../support/bluebird');
require('../spec_helper');
require('pivotal-js-jasmine-matchers');
require('./support/dispatcher_matchers');


const factories = require.context('../factories', true, /\.js$/);
factories.keys().forEach(factories);

const Cursor = require('pui-cursor');
const Deferred = require('../support/deferred');
const {Dispatcher} = require('p-flux');
const jQuery = require('jquery');
const MockFetch = require('../support/mock_fetch');
const MockPromises = require('mock-promises');
const MockRouter = require('./support/mock_router');
const React = require('react');
const ReactDOM = require('react-dom');
const UseRouter = require('../../app/components/use_router');

let globals;

MockFetch.install();

beforeAll(() => {
  globals = {
    Deferred,
    Dispatcher,
    jQuery,
    MockPromises,
    MyReactStarter: {},
    React,
    ReactDOM,
    $: jQuery,
    ...require('./support/react_helper')
  };
  Object.assign(global, globals);
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
  MockFetch.uninstall();
});

beforeEach(() => {
  global.MyReactStarter = {config: {}};

  $('body').find('#root').remove().end().append('<div id="root"/>');
  Cursor.async = false;
  spyOn(require('../../app/bootstrap'), 'init');

  const Application = require('../../app/components/application');
  Application.reset();

  spyOn(Dispatcher, 'dispatch');

  MockPromises.install(Promise);
  MockRouter.install(UseRouter);

  jasmine.clock().install();
  jasmine.Ajax.install();
  Object.assign(XMLHttpRequest.prototype, {
    succeed(data = {}, options = {}) {
      this.respondWith(Object.assign({status: 200, responseText: data ? JSON.stringify(data) : ''}, options));
    },
    fail(data, options = {}) {
      this.respondWith(Object.assign({status: 400, responseText: JSON.stringify(data)}, options));
    }
  });
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
  Dispatcher.reset();
  MockPromises.uninstall();
  MockRouter.uninstall();
  jasmine.clock().uninstall();
  jasmine.Ajax.uninstall();
});
