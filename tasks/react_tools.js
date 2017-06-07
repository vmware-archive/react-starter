import {Foreman, Lint} from 'pui-react-tools';
import test from '../config/webpack/test';
import development from '../config/webpack/development';
import production from '../config/webpack/production';
import Jasmine from './jasmine';
import Assets from './assets';



Assets.install({
  webpack: {
    development,
    production
  }
});

Foreman.install();
Lint.install();


Jasmine.install({
  webpack: {test}
});
