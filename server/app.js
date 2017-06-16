import express from 'express';
import assets from './middleware';
import development from '../config/webpack/development';
import production from '../config/webpack/production';
import history from 'connect-history-api-fallback';

export default function () {
  //TODO use config?

  const app = express();

  const {NODE_ENV = 'development'} = process.env;
  const webpackConfig = NODE_ENV === 'development' ? development : production;
  const assetsMiddleware = assets(NODE_ENV, webpackConfig());

  // if (nodeEnv === 'development')
  // app.get('/config.js', (req, res) => {
  //   res.write(`global.foo = {config: ${JSON.stringify(config)}`);
  // })
  app.use(history({
    rewrites: [
      {from: /\/__webpack_hmr/, to: '/__webpack_hmr'}
    ]
  }));

  app.use(assetsMiddleware);

  return app;
};