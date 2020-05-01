import express from 'express';
import session from '../sessions/session'
//import validator from '../validators/validator.login';
const router = express.Router();

import controller from '../controllers/contentController';

router.get('/',controller.content)

export default router;