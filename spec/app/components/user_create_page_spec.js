require('../spec_helper');

describe('UserCreatePage', () => {
  beforeEach(() => {
    const UserCreatePage = require('../../../app/components/user_create_page');
    ReactDOM.render(<UserCreatePage/>, root);
  });

  describe('creating a user', () => {
    beforeEach(() => {
      $('.user-create-page input').val('Alice').simulate('change');
      $('.user-create-page form').simulate('submit');
    });

    it('creates a new user', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'userCreate', data: {name: 'Alice'}});
    });

    it('navigates to the user list page', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'setRoute', data: '/users/list'});
    });
  });
});
