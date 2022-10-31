import { Router } from 'express';
const router = Router();

// import routes
import roleRouter from './role';

router.use('/role', roleRouter);

export default router;
