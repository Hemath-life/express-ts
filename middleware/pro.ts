import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import ErrorHandler from '../utils/handlers';
// try catch and async - await || use promise

const BigPromise = (func: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch((e) => res.serverError(500, ErrorHandler(e)));

export { BigPromise };
