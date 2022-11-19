import express, { Express } from 'express';

// middleware
import { response } from './middleware/res';
// routes
import router from './routes';

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(response);

// Routes
app.use('/api/v1', router);

export default app;
