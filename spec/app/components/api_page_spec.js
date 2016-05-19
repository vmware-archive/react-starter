require('../spec_helper');

describe('ApiPage', () => {
  beforeEach(() => {
    const ApiPage = require('../../../app/components/api_page');
    ReactDOM.render(<ApiPage posts={[{title: 'bar', id: 1}, {title: 'baz', id: 2}]}/>, root);
  });

  it('fetches posts', () => {
    expect('fetchPosts').toHaveBeenDispatched();
  });

  it('renders the post titles result from the api', () => {
    expect('.api-page').toContainText('bar');
    expect('.api-page').toContainText('baz');
  });
});
