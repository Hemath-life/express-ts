/**
 * Custom error handler to standardize error objects returned to
 * the client
 * @param err Error caught by Express.js
 */

function ErrorHandler(err: any): any {
    let error = err;

    let message: undefined | String;

    if (error instanceof Error && typeof error === 'object') {
        try {
            message = error.message;
        } catch (e) {
            message = undefined;
        }
        // we are not using the next function to prevent from triggering
        // the default error-handler.
    } else if (typeof error === 'string' || error instanceof String) {
        message = error;
    }

    return message;
}

export default ErrorHandler;
