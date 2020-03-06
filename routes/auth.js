import express from 'express';
const router = express.Router();

import controller from '../controllers/auth.controller';

router.get('/',controller.getLogin);
router.post('/',controller.postLogin);

export default router;