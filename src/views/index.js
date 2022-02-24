'use strict';
const ErrorResponseSender = require('./error/ErrorResponseSender');

/**
 * Contains all request handlers.
 */
class RequestHandlerLoader {
    /**
     * Creates a new instance.
     */
    constructor() {
        this.errorHandlers = [];
    }

    /**
     * Adds a new error handler.
     *
     * @param {ErrorHandler} errorHandler The error handler that will be added.
     */
    addErrorHandler(errorHandler) {
        this.errorHandlers.push(errorHandler);
    }

    /**
     * Makes all error handlers available in the specified express
     * Application object. Note that error handlers can not be loaded via an
     * express router object.
     *
     * @param {Application} app The express application hosting the
     *                          error handlers.
     */
    loadErrorHandlers(app) {
        this.errorHandlers.forEach((errorHandler) => {
            errorHandler.registerHandler(app);
        });
    }
}

const loader = new RequestHandlerLoader();
loader.addErrorHandler(new ErrorResponseSender());

module.exports = loader;