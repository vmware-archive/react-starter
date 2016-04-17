require('./env')();
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

module.exports = function() {
  const app = express();

  app.use(express.static(path.join(__dirname, '..', 'public')));

  if (useWebpackDevMiddleware) {
    const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
    app.use(...webpackHotMiddleware());
    app.get('*', webpackHotMiddleware.url('/index.html'));
  }
  return app;
};