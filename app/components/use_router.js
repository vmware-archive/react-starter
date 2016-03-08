const React = require('react');
const Grapnel = require('grapnel');
const {Dispatcher} = require('p-flux');

const exports = {
  Router: Grapnel,
  useRouter: (Component) => class extends React.Component {
    constructor(props, context) {
      super(props, context);
      const {state} = this;
      const router = new (exports.Router)({pushState: true});
      Dispatcher.router = router;
      this.state = {...state, router};
    }

    render() {
      return (<Component {...this.props} {...this.state}/>);
    }
  }
};

module.exports = exports;
