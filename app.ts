import express, { Express } from 'express';

import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Middleware
import { response } from './middleware/res';
// Routes
import router from './routes';

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(response);

// Routes
app.use('/api/v1', router);

export default app;
