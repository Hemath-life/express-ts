/**
 * Custom error handler to standardize error objects returned to
 * the client
 * @param err Error caught by Express.js
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorHandler(err: any): any {
    const error = err;

    let message: undefined | string;

    if (error instanceof Error && typeof error === 'object') {
        try {
            message = error.message;
        } catch (e) {
            message = undefined;
        }
        // we are not using the next function to prevent from triggering
        // the default error-handler.
    } else if (typeof error === 'string' || error instanceof String) {
        message = error as string;
    }

    return message;
}

export default ErrorHandler;
