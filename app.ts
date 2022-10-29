import { Response } from 'express';
import { Request } from 'express';
import { response } from './middleware/res';
import handleError from './utils/handlers';
import express, { Express } from 'express';
import routes from './routes';

const app: Express = express();

app.use(response);

app.use('/api/v1/', routes);

// add custom error handler middleware as the last middleware
// app.use(
//     // error handler
//     app.use(function (err: Error, req: Request, res: Response) {
//         console.log(err);
//     }),
// );
export default app;
