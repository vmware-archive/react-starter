const React = require('react');

const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

const types = React.PropTypes;

const Body = React.createClass({
  propTypes: {
    entry: types.func.isRequired,
    scripts: types.array.isRequired
  },

  render() {
    let {entry, scripts, className} = this.props;
    scripts = scripts.map((src, key) => (<script {...{type: 'text/javascript', src, key}}/>));
    const entryFactory = React.createFactory(entry);
    const __html = ReactDOMServer.renderToString(entryFactory());
    return (
      <body className={className}>
      <div id="root" dangerouslySetInnerHTML={{__html}}/>
      {scripts}
      </body>
    );
  }
});

const Layout = React.createClass({
  propTypes: {
    entry: types.func.isRequired,
    scripts: types.array.isRequired,
    stylesheets: types.array.isRequired,
    title: types.string
  },

  statics: {
    init(Entry) {
      if (typeof document === 'undefined') return;
      ReactDOM.render(<Entry/>, root);
    }
  },

  render() {
    let {stylesheets, title} = this.props;
    stylesheets = stylesheets.map((href, key) => (<link {...{rel: 'stylesheet', type: 'text/css', href, key}}/>));
    return (
      <html>
      <head>
        {title && <title>{title}</title>}
        <meta charSet="UTF-8"/>
        {stylesheets}
      </head>
      <Body {...this.props}/>
      </html>
    );
  }
});

module.exports = Layout;
