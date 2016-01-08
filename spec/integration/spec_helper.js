require('../support/bluebird');
require('../spec_helper');
const webdriverHelper = require('./helpers/webdriver_helper');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
Object.assign(global, {...webdriverHelper});
