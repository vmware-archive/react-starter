require('../../spec_helper');

describe('FakePostsApi', () => {
  let subject;
  const apiUrl = 'http://jsonplaceholder.typicode.com';


  beforeEach(() => {
    subject = require('../../../app/api/fake_posts_api');
  });

  describe('#fetch', () => {
    let doneSpy, failSpy, request;
    beforeEach(() => {
      doneSpy = jasmine.createSpy('done');
      failSpy = jasmine.createSpy('fail');
      subject.fetch().then(doneSpy, failSpy);
      request = jasmine.Ajax.requests.mostRecent();
    });

    it('requests users', () => {
      expect(`${apiUrl}/posts`).toHaveBeenRequested();
    });

    describe('when the request is successful', () => {
      let response;
      beforeEach(() => {
        response = [
          {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
          },
          {
            userId: 1,
            id: 2,
            title: 'qui est esse',
            body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
          }];
        request.succeed(response);
        //The fetchJson method used by FakePostsApi has layers of '.then' attached to the fetch promise
        MockPromises.tick(4);
      });

      it('resolves the promise with the app', () => {
        expect(doneSpy).toHaveBeenCalledWith(response);
      });
    });

    describe('when the request is not successful', () => {
      beforeEach(() => {
        request.fail();
        MockPromises.tick(3);
      });

      it('rejects the promise', () => {
        expect(failSpy).toHaveBeenCalled();
      });
    });
  });
});