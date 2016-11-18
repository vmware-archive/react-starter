require('babel-polyfill');
const React = require('react');
const {Factory} = require('rosie');

let globals;

beforeAll(() => {
  globals = {
    Factory,
    React
  };
  Object.assign(global, globals);
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
});