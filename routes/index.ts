import { Router } from 'express';
const router = Router();

// Import routes
import roleRouter from './role';

router.use('/role', roleRouter);

export default router;
