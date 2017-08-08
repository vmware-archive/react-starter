import WebpackDevServer from 'webpack-dev-server';
import gulp from 'gulp';
import webpack from 'webpack';

const devServerPort = 3000;

gulp.task('dev-server', done => {
    const config = require('../config/webpack/development.babel.js')();
    const compiler = webpack(config);
    compiler.plugin('done', () => {
        done();
    });
    const server = new WebpackDevServer(compiler, config.devServer);

    const port = devServerPort;
  /* eslint-disable no-console */
    console.log(`dev server listening on port ${port}`);
  /* eslint-enable no-console */
    server.listen(port);
});
