const express = require('express');
const Youch = require('youch');
const validate = require('express-validation');
const Sentry = require('@sentry/node');
const routes = require('./routes');
const Mail = require('./app/services/Mail');
require('dotenv').config();

class App {
  constructor() {
    this.express = express();

    this.sentry();
    this.middlewares();
    this.routes();
    this.exception();
  }

  sentry() {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(Sentry.Handlers.errorHandler());
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      const youch = new Youch(err);
      const detail = await youch.toJSON();

      res.sentry = Sentry.captureException(err, { req });

      await Mail.sendMail({
        from: '"App" <app@support.com>',
        to: process.env.MAILTRAP_EMAIL,
        subject: 'App: Internal Server Error',
        html: `<pre>${JSON.stringify(detail)}<pre>`,
      });

      return res.status(err.status || 500).json({
        error: {
          message: 'Internal Server Error',
          detail,
        },
      });
    });
  }
}

module.exports = new App().express;
