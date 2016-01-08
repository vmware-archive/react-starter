require('./spec_helper');

describeWithWebdriver('Features', () => {
  let page;

  describe('when viewing the app', () => {
    beforeEach(async (done) => {
      page = (await visit('/')).page;
      await sleep(1000);
      done();
    });

    it('renders a greeting', async (done) => {
      await waitForText(page, '.hello', 'Hello August');
      done();
    });
  });
});
