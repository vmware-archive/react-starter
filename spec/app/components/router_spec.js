require('../spec_helper');

describe('Router', () => {
  beforeEach(() => {
    const Router = require('../../../app/components/router');
    const routerProps = {
      router: new MockRouter(),
      config: {},
      ...require('../../../app/store')
    };
    ReactDOM.render(<Router {...routerProps}/>, root);
  });

  describe('/', () => {
    beforeEach(() => {
      MockRouter.navigate('/');
    });

    it('renders a todo list', () => {
      expect('.todo-list').toExist();
    });
  });

  describe('/todoList', () => {
    beforeEach(() => {
      MockRouter.navigate('/todoList');
    });

    it('renders a todo list', () => {
      expect('.todo-list').toExist();
    });
  });

  describe('/apiPage', () => {
    beforeEach(() => {
      MockRouter.navigate('/apiPage');
    });

    it('renders a todo list', () => {
      expect('.api-page').toExist();
    });
  });

  describe('/users/list', () => {
    beforeEach(() => {
      MockRouter.navigate('/users/list');
    });

    it('renders the user list page', () => {
      expect('.user-list-page').toExist();
    });
  });

  describe('/users/new', () => {
    beforeEach(() => {
      MockRouter.navigate('/users/new');
    });

    it('renders the new user page', () => {
      expect('.user-create-page').toExist();
    });
  });
});