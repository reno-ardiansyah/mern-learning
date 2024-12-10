import { Router } from 'express';
import { hobbyRouter } from './hobbyRoutes';
import { phoneNumberRouter } from './phoneRoutes';
import { personRouter } from './personRoutes';

const router = Router();

router.use('/hobbies', hobbyRouter);
router.use('/phone-number', phoneNumberRouter);
router.use('/people', personRouter);

export default router;
