require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const types = React.PropTypes;
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');

class Application extends React.Component {
  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired,
    router: types.oneOfType([types.object, types.func])
  };

  render() {
    const {config, store, router} = this.props;
    return (
      <div className="pui-react-starter">
        <a href="todoList" onClick={e => {e.preventDefault(); router.navigate('/todoList');}}>Todo List!</a>
        <br/>
        <a href="apiPage" onClick={e => {e.preventDefault(); router.navigate('/apiPage');}}>Page that hits an api</a>
        <br/>
        <a href="createNewUser" onClick={e => {e.preventDefault(); router.navigate('/users/new');}}>Create New User</a>
        <br/>
        <a href="userList" onClick={e => {e.preventDefault(); router.navigate('/users/list');}}> All Users</a>
        <Router {...{router, config, ...store}}/>
      </div>
    );
  }
}

const EnhancedApplication = useStore(useRouter(Application),
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [
      require('../dispatchers/main_dispatcher'),
      require('../dispatchers/api_dispatcher')
    ],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(EnhancedApplication);

module.exports = EnhancedApplication;
