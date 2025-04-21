import { Router } from 'express';
import { getPage, create } from './registration.controller.js';

const router = Router();

router.get('/',   getPage);   // [GET]  /registration
router.post('/',  create);    // [POST] /registration

export default router;
