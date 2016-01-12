require('babel-polyfill');
const Hello = require('./hello');
const Layout = require('./../../lib/layout');
const React = require('react');

class Application extends React.Component {
  render() {
    return (
      <div className="pui-react-starter">
        <Hello {...{person: {name: 'August'}}}/>
      </div>
    );
  }
};

Layout.init(Application);

module.exports = Application;
