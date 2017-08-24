import express from 'express';

export default function (config) {
  const app = express();

  app.get('/config.js', (req, res) => {
    res.type('text/javascript').status(200)
      .send(`window.${config.globalNamespace} = {config: ${JSON.stringify(config)}}`);
  });

  return app;
};