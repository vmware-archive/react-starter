const invariant = require('invariant');
const React = require('react');
const ReactDOM = require('react-dom');
const Application = require('./components/application');
const {AppContainer} = require('react-hot-loader');

invariant(global.MyReactStarter,
  `globalNamespace in application.json has been changed without updating global variable name.
  Please change "MyReactStarter" in app/index.js to your current globalNamespace`
);

const {config} = global.MyReactStarter;
ReactDOM.render(
  <AppContainer>
    <Application {...{config}}/>
  </AppContainer>, root
);

if (module.hot) {
  module.hot.accept('./components/application', () => {
    const NextApp = require('./components/application');
    ReactDOM.render(
      <AppContainer>
        <NextApp {...{config}}/>
      </AppContainer>,
      root
    );
  });
}