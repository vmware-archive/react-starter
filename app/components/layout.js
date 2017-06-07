import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function Layout({config, children}) {
  const configJs = `window.${config.globalNamespace} = {animation: true, config: ${JSON.stringify(config)}}`;
  const metas = Layout.metas.map((props, key) => <meta {...props} {...{key}}/>);
  return (
    <html>
    <head>{metas}</head>
    <body>
    <div id="root" dangerouslySetInnerHTML={children && {__html: ReactDOMServer.renderToString(children)}}/>
    <script dangerouslySetInnerHTML={{__html: configJs}}/>
    </body>
    </html>
  );
}

Layout.propTypes = {
  config: React.PropTypes.object.isRequired
};

Layout.metas = [
  {charSet: 'utf-8'},
  {httpEquiv: 'x-ua-compatible', content: 'ie=edge'},
  {name: 'description', content: ''},
  {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'}
];
