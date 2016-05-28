# React Starter

[![Build Status](https://travis-ci.org/pivotal-cf/react-starter.svg?branch=master)](https://travis-ci.org/pivotal-cf/react-starter)

React Starter is a todoApp project with much of the tooling in place you would need for a fully-featured React application.
[Click here](http://react-starter.cfapps.io/) to see it in action.

## Getting Started

First, make sure you have:

* Node version 4+ (it may work with older versions of node, but node-sass less likely to install correctly).
* Npm version 3+

If either of these is an earlier version, you will likely see errors when you run the code. 
If you have installed and then realize you need to change either of these, you will need to `rm -rf node_modules` and `npm install` to make sure dependencies are correctly updated and installed.

```
git clone git@github.com:pivotal-cf/react-starter.git && cd react-starter
npm install
```

(Windows Users: To install node-sass, you will need a C compiler like Visual Studio installed, and probably also Python 2.x)

### Using gulp

To make life easier, add `./node_modules/.bin` to your PATH. This will give you access to `gulp`.

```
gulp foreman
```

This will start up the development server at [3000](http://localhost:3000) and the Jasmine server at [8888](http://localhost:8888).
The app includes example React architecture, along with Jasmine unit tests and a WebdriverIO integration test.

## Testing

### Unit Testing

Any files matching `spec/app/**/*_spec.js` will be run as part of [Jasmine](jasmine.github.io). There are some example tests included in `spec/app/components/`.

To run the tests headlessly in phantomjs:
```
gulp spec-app
```

To run a Jasmine server (on port 8888):
```
gulp jasmine
```
The jasmine server will watch for file changes and update appropriately.
Note that `gulp foreman` will start a jasmine server for you.

In general, testing a React component will need the line `require('../spec_helper')` as the first line.
The test will also probably have lines like
```
const MyComponent = require('../../../app/components/my_component');
ReactDom.render(<MyComponent {...props}/>, root)
```
where `props` is an object representing the props passed into the React component. 
The spec_helper re-creates a div with id="root" (referenced by `root`) where you can render your components.

Testing the results of rendering is made easier with [jasmine_dom_matchers](https://github.com/charleshansen/jasmine_dom_matchers),
this is where `toHaveText` is defined.

We have also provided some custom matchers with [pivotal-js-jasmine-matchers](https://github.com/pivotal-cf/pivotal-js/tree/master/packages/pivotal-js-jasmine-matchers).

#### Factories

React starter sets up Factories using [Rosie](https://github.com/rosiejs/rosie).
Factories are defined in the `spec/factories` folder.
The easiest way to create a new factory is to create a new file in `spec/factories`.
See `spec/factories/user.js` as an example.


### Integration Testing

Integration tests use [selenium-standalone](https://github.com/vvo/selenium-standalone) and [WebdriverIO](http://webdriver.io/).

Selenium requires Java, so make sure this is installed. Run:
```
gulp spec-integration
```

This will take any files matching `spec/integration/**/*_spec.js` and run them through Jasmine.
We provide a `describeWithWebdriver` function, inside of which you have access to WebdriverIO functionality.

WebdriverIO is based on promises. Any time you interact with the browser in any way, this will be asynchronous and return a promise.
To make this more readable, we use `async`/`await` syntax (from EcmaScript 2016) and the `done` callback from Jasmine.

There are also a number of functions provided in `spec/integration/helpers/webdriver_helper.js`.

An example integration test is provided at `spec/integration/features_spec.js`.

### Linting

To lint your JavaScript code using [ESLint](http://eslint.org/):

```
gulp lint
```

The linting rules are set in `.eslintrc`


### Development

To start your development server, run:

```
gulp s
```

This will serve at [3000](http://localhost:3000). Note that `gulp foreman` will start a development server for you.
The JavaScript is compiled using [Babel](https://babeljs.io/) and [Webpack](https://webpack.github.io/).
By default, the entry point for your JavaScript is `app/components/application.js`.
Webpack settings are controlled in `config/webpack.config.js`.

#### Workflow

We have provided an example flux implementation in this application.

* A component calls an action
* The action calls the dispatcher
* The corresponding method in the dispatcher updates the global store

#### Flux

The flux patterns used in React starter have been extracted into [p-flux](https://github.com/pivotal-cf/p-flux).
Look into p-flux documentation for best practices on storing and updating data.

#### Router

We have provided an example router in this application. The router is using [Grapnel](https://github.com/bytecipher/grapnel).

Router callbacks should be responsible for changing the page. 
This can be accomplished by storing a page component in the router, as in `app/components/router.js`.
Router callbacks also have access to props and Actions to save route params in the store.
 
We recommend having a `setRoute` dispatch event for easy debugging. We have provided an example in `app/dispatchers/main_dispatcher.js`.

We have also provided a mock router for use in test in `spec/app/support/mock_router.js`.
The mock router is installed in `spec/app/spec_helper.js`.
If you do not mock the router, it will change your browser URL while running Jasmine.

#### API

We have provided an example workflow that talks to an api, using the JSONPlaceholder api and `window.fetch`.
Using an api requires asynchronous testing, which can be difficult.
We use [MockPromises](https://github.com/charleshansen/mock-promises) to deal with most of it.
