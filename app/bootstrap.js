const React = require('react');
const ReactDOM = require('react-dom');

module.exports = {
  init(Entry, props = {}) {
    if (typeof document === 'undefined') return;
    const {config} = global.MyReactStarter;
    ReactDOM.render(<Entry {...props} {...{config}}/>, root);
  }
};


