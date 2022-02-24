'use strict';

/**
 * This is the last resort for error handling. Sends an error message in
 * response to all uncaught exceptions.
 */
class ErrorResponseSender {
  /**
   * Constructs a new instance.
   */
  constructor() {
    this.contr = Controller.createController();
  }

  /**
   * @return {string} The URL paths handled by this error handler.
   */
  get path() {
    return '/';
  }

  /**
   * Registers the request handling function, which sends a response describing
   * the error, with HTTP status code 500. Request handling ends after
   * executing this method, since it does not call next().
   *
   * @param {Application} app The express application hosting the
   *                          error handler.
   */
  registerHandler(app) {
    /*
     * Returns error message.
     */
    app.use(this.path, (err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500).send({ error: 'Operation failed.' });
    });
  }
}

module.exports = ErrorResponseSender;