const invariant = require('invariant');
const React = require('react');
const ReactDOM = require('react-dom');
const Application = require('./components/application');
const {AppContainer} = require('react-hot-loader');

require('babel-loader!pui-react-tools/assets/entry-loader?name=index.html!./components/application');
invariant(global.MyReactStarter,
  `globalNamespace in application.json has been changed without updating global variable name bootstrap.js.
  Please change "MyReactStarter" in bootstrap.js to your current globalNamespace`
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