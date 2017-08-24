require('../spec_helper');
import PropTypes from 'prop-types';

describe('#useRouter', () => {
  let routeSpy;

  beforeEach(() => {
    const {useRouter} = require('../../../app/components/use_router');
    routeSpy = jasmine.createSpy('route');

    const Application = ({router}) => {
      router.get('/test', routeSpy);
      return (
        <div className="application">
          <button onClick={() => router.navigate('/test')}>Route</button>
        </div>
      );
    };
    Application.propTypes = {
      router: PropTypes.func.isRequired
    };

    const TestRouter = useRouter(Application);
    ReactDOM.render(<TestRouter/>, root);
  });

  it('routes', () => {
    $('.application button').simulate('click');
    expect(routeSpy).toHaveBeenCalled();
  });
});
