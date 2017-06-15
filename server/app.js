import express from 'express';
import assets from './middleware';
import development from '../config/webpack/development';
import production from '../config/webpack/production';
import history from 'connect-history-api-fallback';


export default function () {
  //TODO use config?
  require('./env')();

  const app = express();

  const nodeEnv = process.NODE_ENV || 'development';
  const webpackConfig = nodeEnv === 'development' ? development : production;
  const assetsMiddleware = assets(nodeEnv, webpackConfig());
  app.use(history({
    rewrites: [
      {from: /\/__webpack_hmr/, to: '/__webpack_hmr'}
    ]
  }));

  app.use(assetsMiddleware);

  return app;
};