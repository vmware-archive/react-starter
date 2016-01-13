require('babel-polyfill');
const Hello = require('./hello');
const Bootstrap = require('../bootstrap');
const React = require('react');

class Application extends React.Component {
  render() {
    return (
      <div className="pui-react-starter">
        <Hello {...{person: {name: 'August'}}}/>
      </div>
    );
  }
}

Bootstrap.init(Application);

module.exports = Application;
