import { NextFunction } from 'express';
import { Response, Request } from 'express';
// export class error {
//     message!: string;
//     status!: number;
//     additionalInfo!: any;

//     constructor(message: string, status: number = 500, additionalInfo: any = {}) {
//         this.message = message;
//         this.status = status;
//         this.additionalInfo = additionalInfo;
//     }
// }
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
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
        // we are not using the next function to prvent from triggering
        // the default error-handler. However, make sure you are sending a
        // response to client to prevent memory leaks in case you decide to
        // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    } else if (typeof error === 'string' || error instanceof String) {
        message = error;
    }

    return message;
}

export default ErrorHandler;
