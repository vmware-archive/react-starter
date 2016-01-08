require('../spec_helper');

describe('Hello', () => {
  beforeEach(() => {
    const Hello = require('../../../app/components/hello');
    const person = Factory.build('person', {name: 'Felix'});
    ReactDOM.render(<Hello {...{person}}/>, root);
  });

  it('says hello to that person', () => {
    expect(root).toHaveText('Hello Felix');
  });
});
