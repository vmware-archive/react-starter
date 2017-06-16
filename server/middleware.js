import express from 'express';
import path from 'path';
import {Router} from 'express';

export default function assets(NODE_ENV, webpackConfig) {
  const router = new Router();
  if (NODE_ENV === 'development') {
    const dev = require('webpack-dev-middleware');
    const hot = require('webpack-hot-middleware');
    const webpack = require('webpack');
    const compiler = webpack(Object.assign({watch: true}, webpackConfig));
    router.use(dev(compiler, {
      overlay: true, noInfo: true, reload: true, stats: { colors: true }
    }));
    router.use(hot(compiler));
  } else {
    router.use(express.static(path.resolve(__dirname, '../public')));
  }
  return router;
}
