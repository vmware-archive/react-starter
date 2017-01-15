const express = require('express');
const path = require('path');

module.exports = function(config) {
  require('./env')();
  const {useWebpackDevMiddleware} = config;
  const app = express();

  if (useWebpackDevMiddleware) {
    const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
    app.use(...webpackHotMiddleware());
    app.get('/config.js', function(req, res) {
      res.type('text/javascript').status(200)
        .send(`window.${config.globalNamespace} = {config: ${JSON.stringify(config)}, foo: "bar"}`);
    });
    app.get('*', webpackHotMiddleware.url('/index.html'));
  } else {
    app.use(express.static(path.join(__dirname, '..', 'public')));
  }

  return app;
};