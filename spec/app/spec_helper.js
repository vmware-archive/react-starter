require('babel-polyfill');
require('jasmine-ajax');
require('jasmine_dom_matchers');
require('../spec_helper');
require('./react_matchers');

const factories = require.context('../factories', true, /\.js$/);
factories.keys().forEach(factories);

const Cursor = require('pui-cursor');
const Dispatcher = require('../../app/dispatchers/dispatcher');
const jQuery = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

Object.assign(global, {
  Dispatcher,
  jQuery,
  React,
  ReactDOM,
  $: jQuery
}, require('./support/react_helper'));

beforeEach(() => {
  $('body').find('#root').remove().end().append('<div id="root"/>');
  Cursor.async = false;
  spyOn(Dispatcher, 'dispatch');

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
  jasmine.clock().uninstall();
  jasmine.Ajax.uninstall();
});
