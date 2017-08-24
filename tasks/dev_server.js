import WebpackDevServer from 'webpack-dev-server';
import gulp from 'gulp';
import webpack from 'webpack';

const devServerPort = 3000;

let server;
function kill() {
  if (server) server.close();
}

gulp.task('dev-server', done => {
  const config = require('../config/webpack/development.js')();
  const compiler = webpack(config);
  compiler.plugin('done', () => {
    done();
  });
  server = new WebpackDevServer(compiler, config.devServer);

  const port = process.env.PORT || devServerPort;
  /* eslint-disable no-console */
  console.log(`dev server listening on port ${port}`);
  /* eslint-enable no-console */
  server.listen(port);
});

export {kill};