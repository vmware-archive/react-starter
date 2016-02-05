const {compact} = require('../../../helpers/application_helper');
const join = require('url-join');
const JasmineWebdriver = require('../support/jasmine_webdriver');

let webdriver;

function visit(url) {
  return webdriver.driver().then(({driver}) => {
    return driver.url(join(...compact([`http://localhost:${process.env.PORT}`, url]))).then(() => ({page: driver}));
  });
}

function click(page, selector) {
  return waitForExist(page, selector)
    .then(function() {
      return page.click(selector);
    })
    .then(function(status) {
      if (!status) throw new Error(`click timed out waiting for ${selector}`);
    });
}

function waitForExist(page, selector) {
  return page.waitForExist(selector)
    .then(function(status) {
      if (!status) throw new Error(`WaitForExist timed out waiting for ${selector}`);
    });
}

function waitUntil(page, description, callback, timeout = 5000) {
  return page.waitUntil(callback, timeout)
    .then(function(status) {
      if (!status) throw new Error(`WaitUntil timed out waiting for ${description || callback.toString()}`);
    });
}

function waitUntilCondition(page, condition) {
  return waitUntil(page, `condition: ${condition.toString()}`, function() {
    return page.execute(condition).then(({value}) => value);
  });
}

function waitForCookie(page, cookie) {
  const codeToRunInPage = `function() { return document.cookie.match(new RegExp("${cookie}")); }`;
  /* eslint-disable no-eval */
  return waitUntilCondition(page, eval(`(function() { return ${codeToRunInPage}; })()`));
  /* eslint-enable no-eval */
}


function waitForCount(page, selector, count, operator = '===') {
  const codeToRunInPage = `function() { return document.querySelectorAll("${selector}").length ${operator} ${count} }`;
  /* eslint-disable no-eval */
  return waitUntilCondition(page, eval(`(function() { return ${codeToRunInPage}; })()`));
  /* eslint-enable no-eval */
}

function setValue(page, selector, inputText = '') {
  return waitForExist(page, selector)
    .then(function() {
      return page.setValue(selector, inputText);
    });
}

function waitForValue(page, selector, value, ...args) {
  return page.waitForValue(selector, value, ...args).then(function(status) {
    if(!status) throw new Error(`WaitForValue timed out waiting for ${selector}, ${value}`);
  });
}

function waitForText(page, selector, expectedText = '') {
  return waitForExist(page, selector)
    .then(function() {
      return page.waitUntil(() => page.getText(selector).then(text => text.includes(expectedText)));
    })
    .then(function(status) {
      if (!status) throw new Error(`WaitForText timed out waiting for ${selector}, ${expectedText}`);
    });
}

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function describeWithWebdriver(name, callback, options = {}) {
  describe(name, function() {
    beforeEach(() => {
      webdriver = webdriver || new JasmineWebdriver({timeout: 5000, ...options});
    });

    afterEach(async function(done) {
      await webdriver.end();
      done();
    });

    callback();
  });
}

module.exports = {click, describeWithWebdriver, visit, waitForCount, setValue, waitForValue, waitForText, waitForExist, waitForCookie, sleep};
