import {Assets, Foreman, Jasmine, Lint} from 'pui-react-tools';
import test from '../config/webpack/test';
import development from '../config/webpack/development';
import production from '../config/webpack/production';

Assets.install({
  webpack: {
    development,
    production,
    integration: production
  }
});

Foreman.install();
Lint.install();

Jasmine.install({
  webpack: {test}
});
