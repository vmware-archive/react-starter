require('babel-polyfill');
const Hello = require('./hello');
const Layout = require('./layout');
const React = require('react');

const Application = React.createClass({
  render() {
    return  (
      <div className="pui-react-starter">
        <Hello {...{person: {name: 'August'}}}/>
      </div>
    )
  }
});

Layout.init(Application);

module.exports = Application;
