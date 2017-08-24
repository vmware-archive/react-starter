const React = require('react');
import PropTypes from 'prop-types';
const ApiPage = require('./api_page');
const UserCreatePage = require('./user_create_page');
const UserListPage = require('./user_list_page');
const TodoPage = require('./todo_page');

function isObject(obj) {
  return typeof obj === 'object';
}

function toFlattenedRoutes(routesHash) {
  return Object.keys(routesHash).reduce((paths, parent) => {
    if (isObject(routesHash[parent])) {
      const children = toFlattenedRoutes(routesHash[parent]);
      Object.keys(children).forEach(child => paths[parent + child] = children[child]);
    } else {
      paths[parent] = routesHash[parent];
    }
    return paths;
  }, {});
}

const ROUTES = {
  '/': 'todoList',
  '/todoList': 'todoList',
  '/apiPage': 'apiPage',
  '/users': {
    '/list': 'showUsers',
    '/new': 'createUser'
  }
};

const PAGES = { ApiPage, UserCreatePage, UserListPage, TodoPage };

class Router extends React.Component {
  static propTypes = {
    router: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

  constructor(props, context) {
    super(props, context);
    const {state} = this;
    this.state = {...state, pageName: 'TodoPage' };
  }

  componentDidMount() {
    const {router} = this.props;
    Object.entries(toFlattenedRoutes(ROUTES)).map(([path, callbackName]) => {
      router.get(path, this[callbackName]);
    });
  }

  apiPage = () => {
    this.setState({pageName: 'ApiPage'});
  };

  todoList = () => {
    this.setState({pageName: 'TodoPage'});
  };

  showUsers = () => {
    this.setState({pageName: 'UserListPage'});
  };

  createUser = () => {
    this.setState({pageName: 'UserCreatePage'});
  };

  render() {
    const {pageName} = this.state;
    const Page = PAGES[pageName];
    return (
      <Page {...this.props}/>
    );
  }
}

module.exports = Router;
