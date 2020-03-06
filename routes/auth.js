import express from 'express';
import validator from '../validators/validator.login';
const router = express.Router();

import controller from '../controllers/auth.controller';

router.get('/',controller.getLogin);
router.post('/',validator.login,controller.postLogin);

export default router;