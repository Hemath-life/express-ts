import express, { Express } from 'express';

// import 'dotenv/config'; ro
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

// Middleware
import { response } from './middleware/res';

// Utils
import handleError from './utils/handlers';

// Routes
import router from './routes';
import connectDB from './config/database';
import { roleSeed } from './seed/role';

// Connect to MongoDB
connectDB();

// Express configuration
const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(response);

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
    res.send('API Running');
});

app.use('/api/v1', router);

// add custom error handler middleware as the last middleware
// app.use(
//     // error handler
//     app.use(function (err: Error, req: Request, res: Response) {
//         console.log(err);
//     }),
// );// Express configuration
export default app;
