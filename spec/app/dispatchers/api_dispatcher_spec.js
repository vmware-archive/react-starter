require('../spec_helper');

describe('ApiDispatcher', () => {
  let subject, Cursor, cursorSpy;

  beforeEach(() => {
    Cursor = require('pui-cursor');
    cursorSpy = jasmine.createSpy('callback');
    subject = Dispatcher;

    //dispatch is spied on in spec_helper
    subject.dispatch.and.callThrough();

    //prevent console logs
    spyOn(subject, 'onDispatch');
  });

  describe('fetchPosts', () => {
    const apiUrl = 'http://jsonplaceholder.typicode.com';

    beforeEach(() => {
      subject.$store = new Cursor({}, cursorSpy);
      subject.dispatch({type: 'fetchPosts'});
    });

    it('makes an api request to posts', () => {
      expect(`${apiUrl}/posts`).toHaveBeenRequested();
    });

    it('triggers updatePosts on success', () => {
      const request = jasmine.Ajax.requests.mostRecent();
      request.succeed(['bar', 'baz']);
      MockPromises.tick(4);
      expect('updatePosts').toHaveBeenDispatchedWith({data: ['bar', 'baz']});
    });
  });

  describe('updatePosts', () => {
    beforeEach(() => {
      subject.$store = new Cursor({posts: []}, cursorSpy);
      subject.dispatch({type: 'updatePosts', data: ['bar', 'baz']});
    });

    it('sets posts in the cursor', () => {
      expect(cursorSpy).toHaveBeenCalledWith({posts: ['bar', 'baz']});
    });
  });
});
