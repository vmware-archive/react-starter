const express = require('express');
import assets from './middleware';
import development from '../config/webpack/development';
import production from '../config/webpack/production';
import history from 'connect-history-api-fallback';


module.exports = function (config) {
  require('./env')();

  const app = express();
  const webpackConfig = process.NODE_ENV === 'production' ? production : development;
  const assetsMiddleware = assets(config, webpackConfig());
  app.use(history({
    rewrites: [
      {from: /\/__webpack_hmr/, to: '/__webpack_hmr'}
    ]
  }));

  app.use(assetsMiddleware);

  return app;
};