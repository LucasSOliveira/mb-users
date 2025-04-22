import { Router } from 'express';
import { getPage, create } from './registration.controller.js';

const router = Router();

router.get('/registration', getPage);
router.post('/api/registration',  create);

export default router;
