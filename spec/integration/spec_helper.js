require('../support/bluebird');
require('../spec_helper');
const webdriverHelper = require('./helpers/webdriver_helper');
const JasmineAsyncSuite = require('jasmine-async-suite');

JasmineAsyncSuite.install();

const {DEFAULT_TIMEOUT_INTERVAL} = jasmine;

let globals = {...webdriverHelper};
Object.assign(global, globals);

beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
});

afterAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL;
  Object.keys(globals).forEach(key => delete global[key]);
  JasmineAsyncSuite.uninstall();
});