const {Assets, Foreman, Lint, Jasmine} = require('pui-react-tools');

Assets.install();
Foreman.install();
Lint.install();
Jasmine.install({getAdditionalAppAssets: () => [Assets.sass()]});
