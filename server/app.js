require('./env');
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

const app = express();

if (useWebpackDevMiddleware) {
  const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
  app.use(...webpackHotMiddleware());
}

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
