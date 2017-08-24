import ReactDOMServer from 'react-dom/server';
import Layout from './components/layout';
import React from 'react';
import Application from './components/application';

export default function Index(props, done) {
  const {config = {}} = props;
  const html = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<Layout {...{config}}><Application {...{config}}/></Layout>)}`;
  if (!done) return html;
  done(null, html);
}