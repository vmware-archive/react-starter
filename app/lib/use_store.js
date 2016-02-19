const Cursor = require('pui-cursor');
const React = require('react');
const Dispatcher = require('./dispatcher');
const {initializeActions} = require('./initializers');

const useStore = (Component, options = {}) => class extends React.Component {
  constructor(props, context) {
    const {store = {}, dispatchers, actions, onDispatch} = options;
    super(props, context);
    this.state = { store };
    Dispatcher.initialize({dispatchers, onDispatch});
    initializeActions({dispatchers, actions});
  }

  componentWillUnmount() {
    Dispatcher.reset();
  }

  render() {
    const props = this.props;
    Dispatcher.$store = new Cursor(this.state.store, store => this.setState({store}));
    return (<Component {...props} {...this.state}/>);
  }
};

module.exports = useStore;
