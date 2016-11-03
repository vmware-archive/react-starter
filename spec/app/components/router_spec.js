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
});