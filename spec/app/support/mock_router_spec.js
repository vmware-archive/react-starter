require('../spec_helper');

describe('MockRouter', () => {
  let route1Spy, route2Spy, router;
  beforeEach(() => {
    const {Router} = require('../../../app/components/use_router');
    router = new Router({pushState: true});
    route1Spy = jasmine.createSpy('route1');
    route2Spy = jasmine.createSpy('route2');
    router.get('foo', route1Spy);
    router.get('foo/:bar/:baz', route2Spy);
  });

  describe('#navigate', () => {
    it('works for a route without params', () => {
      router.navigate('foo');
      expect(route1Spy).toHaveBeenCalledWith({params: {}});
    });

    it('works for routes with params', () => {
      router.navigate('foo/abc/456');
      expect(route2Spy).toHaveBeenCalledWith({params: {bar: 'abc', baz: '456'}});
    });

    it('works with query params', () => {
      router.navigate('foo?bar=abc');
      expect(route1Spy).toHaveBeenCalledWith({params: {bar: 'abc'}});
    });

    it('works for routes with params with query params', () => {
      router.navigate('foo/abc/456?name=bob');
      expect(route2Spy).toHaveBeenCalledWith({params: {bar: 'abc', baz: '456', name: 'bob'}});
    });
  });
});
