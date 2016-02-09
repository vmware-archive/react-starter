const Cursor = require('pui-cursor');
const React = require('react');
const Dispatcher = require('../dispatchers/dispatcher');

const useStore = Component => class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      store: {
        todoItems: []
      }
    };
  }

  render() {
    const props = this.props;
    Dispatcher.$store = new Cursor(this.state.store, store => this.setState({store}));
    return (<Component {...props} {...this.state}/>);
  }
};

module.exports = useStore;
