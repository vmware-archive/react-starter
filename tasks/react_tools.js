const {Assets, Foreman, Lint, Jasmine} = require('pui-react-tools');

Assets.install({
  assets: {
    sass: false,
    html: false
  },
  useAssetsServer: false
});
Foreman.install();
Lint.install();
Jasmine.install();
