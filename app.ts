import express, { Express, Response, Request } from 'express';
// import 'dotenv/config'; ro
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

// middleware
import { response } from './middleware/res';
// utils
import handleError from './utils/handlers';
// routes
import router from './routes';
import connectDB from './config/database';
import { roleSeed } from './seed/role';

const app: Express = express();
connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
roleSeed();

app.use(response);
app.use('/api/v1', router);

// add custom error handler middleware as the last middleware
// app.use(
//     // error handler
//     app.use(function (err: Error, req: Request, res: Response) {
//         console.log(err);
//     }),
// );
export default app;
