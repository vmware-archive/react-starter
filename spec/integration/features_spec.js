require('./spec_helper');

describeWithWebdriver('Features', () => {
  let page;

  describe('when viewing the app', () => {
    beforeEach.async(async() => {
      page = (await visit('/')).page;
      await waitForExist(page, '.pui-react-starter');
    });

    it.async('can add a todoItem', async() => {
      await setValue(page, '.todo-adder input', 'DO THIS THING');
      await click(page, '.todo-adder button');
      await waitForText(page, '.todo-list .todo-item', 'DO THIS THING');
    });
  });
});
