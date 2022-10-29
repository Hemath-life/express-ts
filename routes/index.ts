import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { Router } from 'express';
const routes = Router();

// import components
import UserController from '../components/user/index';
import { BigPromise } from '../middleware/pro';
import ErrorHandler from '../utils/handlers';

// routes.get('/users', UserController.index);

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.serverError(400, 'good');
    } catch (e) {
        res.serverError(500, ErrorHandler(e));
    }
});
export default routes;
